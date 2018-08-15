/**
 * Pokemon container.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
import LoadingScreen from "react-loading-screen";

// Components
import BasicInfo from '../../components/pokemon-info/basic-info/';
import CustomCarousel from "../../components/pokemon-info/custom-carousel";
import AsideInfo from "../../components/pokemon-info/aside-info";
import EvolutionChain from "../../components/pokemon-info/evolution-chain";
import Index from "../../constants/index";
import Error from '../../components/error/';

// SCSS
import './pokemon.scss';

// Images
import silhouette from "../../assets/img/content/silhouette.png";

export class PokemonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {  name: this.props.props.match.params.name, game: this.props.props.match.params.game, isLoading: true,
                        info: {name:'', number:'', height:'', weight:'', types:[], generation:'', description:'', locations: []},
                        sprites:{frontDefault:'', backDefault:'', frontShiny:'', backShiny:''},
                        asideInfo: {baseExperience:'', baseHappiness:'', habitat:''},
                        evolutionInfo: {},
                        error: null
        }
    }

    async componentDidMount() {

        // pokeapi wrapper variables
        const Pokedex = require('pokeapi-js-wrapper');
        const options = {
            protocol: 'https',
            hostName: 'pokeapi.co:443',
            versionPath: '/api/v2/',
            cache: true,
            timeout: 5 * 1000 // 5s
        };
        const P = new Pokedex.Pokedex(options);

        try {
            const pokemonJSON = await P.getPokemonByName(this.state.name);

            // sprites
            const sprites = pokemonJSON.sprites;

            // pokedex entry
            let number;
            switch (pokemonJSON.id.toString().length) {
                case 1:
                    number = '00' + pokemonJSON.id;
                    break;
                case 2:
                    number = '0' + pokemonJSON.id;
                    break;
                default:
                    number = '' + pokemonJSON.id;
                    break;
            }

            const specieJSON = await P.getPokemonSpeciesByName(this.state.name);

            // description
            let description;
            description = specieJSON.flavor_text_entries.filter(entry => entry.version.name === this.state.game && entry.language.name === 'en')[0].flavor_text;
            if (description === '')
                description = 'This description is missing in the PokeAPI';

            // types
            const types = pokemonJSON.types.map(function(position) {
                return position.type.name;
            });

            // generation
            let generationArray = specieJSON.generation.name.split('-');
            let generation = generationArray[0].replace(/^\w/, c => c.toUpperCase());
            switch (generationArray[1]) {
                case 'i':
                    generation += ' 1 (Kanto)';
                    break;
                case 'ii':
                    generation += ' 2 (Johto)';
                    break;
                case 'iii':
                    generation += ' 3 (Hoenn)';
                    break;
                case 'iv':
                    generation += ' 4 (Sinnoh)';
                    break;
                case 'v':
                    generation += ' 5 (Unova)';
                    break;
                case 'vi':
                    generation += ' 6 (Kalos)';
                    break;
                case 'vii':
                    generation += ' 7 (Alola)';
                    break;
            }

            // Pokemon locations
            const encountersJSON = await P.resource(Index.BASE_URL + pokemonJSON.location_area_encounters);
            let locations = [];
            locations = this.fillLocationsArray(locations, encountersJSON);
            locations = this.beautifyLocations(locations);

            // Evolution chain
            const evolutionsJSON = await P.resource(specieJSON.evolution_chain.url);
            const evolutionInfo = await this.getEvolutionInfo(evolutionsJSON, P);
            this.setState({
                isLoading: false,
                info: {
                    name: this.state.name.replace(/^\w/, c => c.toUpperCase()),
                    number: number,
                    height: pokemonJSON.height,
                    weight: pokemonJSON.weight,
                    types: types,
                    generation: generation,
                    description: description,
                    locations: locations
                },
                sprites: {
                    frontDefault: sprites.front_default,
                    backDefault: sprites.back_default,
                    backShiny: sprites.back_shiny,
                    frontShiny: sprites.front_shiny
                },
                asideInfo: {
                    baseExperience: pokemonJSON.base_experience,
                    baseHappiness: specieJSON.base_happiness,
                    habitat: specieJSON.habitat.name.replace(/^\w/, c => c.toUpperCase())
                },
                evolutionInfo: evolutionInfo
            });
        } catch (error) {
            this.setState({
                error,
                isLoading: false
            })
        }
    }

    fillLocationsArray(locations, encountersJSON) {
        if (encountersJSON.length === 0) {
            locations[0] = 'Location unknown';
        } else {
            for (var j = 0; j < encountersJSON.length; j++) {
                var encounterDetail = encountersJSON[j];
                for (var k = 0; k < encounterDetail.version_details.length; k++) {
                    var versionDetail = encounterDetail.version_details[k];
                    if (this.state.game === versionDetail.version.name) {
                        if (!locations.includes(encounterDetail.location_area.name)) {
                            locations.push(encounterDetail.location_area.name.replace(/^\w/, c => c.toUpperCase()));
                        }
                    }
                }
            }
            if (locations.length === 0)
                locations[0] = 'Location unknown';
        }
        return locations;
    }

    beautifyLocations(locations) {
        return locations.map(function(location) {
            return location.split('-').join(' ');
        }).join(', ');
    }

    async getEvolutionInfo(evolutionJSON, P) {
        const first = await this.getFirstPokemon(evolutionJSON, P);
        const last = await this.getLastPokemons(evolutionJSON, P);
        return {first: first, second: last.second, third: last.third}; // the object to be setted on the state
    }

    async getFirstPokemon(evolutionJSON, P) {
        const name = evolutionJSON.chain.species.name;
        const speciesJSON = await P.getPokemonByName(name);
        const sprite = speciesJSON.sprites.front_default;
        return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite};
    }

    async getLastPokemons(evolutionJSON, P) {
        let secondEvolutionArray = [];
        let thirdEvolutionArray = [];

        const evolutions = evolutionJSON.chain.evolves_to;
        if(evolutions.length !== 0) { // if it has evolutions
            for (let i in evolutions) {

                const trigger = this.getEvolutionTrigger(evolutions[i]);

                const name = evolutions[i].species.name;
                const speciesJSON = await P.getPokemonByName(name); // get sprite
                const sprite = speciesJSON.sprites.front_default;

                const nextEvolutions = evolutions[i].evolves_to;
                if(nextEvolutions.length !== 0) {
                    for(let j in nextEvolutions) {
                        thirdEvolutionArray.push(await this.getThirdPokemon(nextEvolutions[j], P));
                    }
                }

                secondEvolutionArray.push({
                    trigger: trigger, sprite: sprite, name: name.replace(/^\w/, c => c.toUpperCase())
                });
            }
        }
        return {second: secondEvolutionArray, third: thirdEvolutionArray};
    }

    async getThirdPokemon(evolutionJSON, P) {
        const name = evolutionJSON.species.name;
        const speciesJSON = await P.getPokemonByName(name);
        const sprite = speciesJSON.sprites.front_default;
        const trigger = this.getEvolutionTrigger(evolutionJSON);
        return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite, trigger: trigger};
    }

    getEvolutionTrigger(evolution) {
        let trigger = '';
        let level = 'up';
        let happiness = '';
        let affection = '';
        let time = '';
        let item = '';
        let location = '';
        if (evolution.evolution_details[0].trigger.name === 'level-up') { // if leveling up
            if (evolution.evolution_details[0].time_of_day !== '') { // if some time in the day
                time = ` at ${evolution.evolution_details[0].time_of_day}`;
            }
            if (evolution.evolution_details[0].min_happiness !== null) { // if with happiness
                happiness = ` with minimum happiness of ${evolution.evolution_details[0].min_happiness}`;
            }
            if (evolution.evolution_details[0].min_affection !== null) { // if with happiness
                affection = ` with minimum affection of ${evolution.evolution_details[0].min_affection}`;
            }
            if (evolution.evolution_details[0].location !== null) { // if near a certain location
                location = ` near ${evolution.evolution_details[0].location.name}`;
            }
            level = evolution.evolution_details[0].min_level;
            if (level === null) // if a certain level
                level = 'up';
            trigger = `Level ${level}${time}${happiness}${affection}${location}`;

        } else if (evolution.evolution_details[0].trigger.name === 'use-item') { // if with item
            trigger = `Use ${evolution.evolution_details[0].item.name}`;
        } else if (evolution.evolution_details[0].trigger.name === 'trade') { // if traded
            if (evolution.evolution_details[0].item.name !== null)
                item = `equipped with ${evolution.evolution_details[0].item.name}`;
            trigger = `Trade ${item}`;
        }
        return trigger;
    }

    render () {
        if (this.state.isLoading) {
            return (
                <main>
                    <Container fluid={true} className='pt-4 pb-5'>
                        <Container className='main'>
                            <LoadingScreen
                                loading={true}
                                bgColor='transparent'
                                spinnerColor='#9ee5f8'
                                textColor='#676767'
                                logoSrc={silhouette}
                                text='Wait a second, looking for the pokemon data...'>
                                <div/>
                            </LoadingScreen>
                        </Container>
                    </Container>
                </main>
            );
        } /*else if (this.state.error) {
            return <Error />
        }*/
        return (
            <main>
                <Container fluid={true} className='pt-4 pb-5'>
                    <Container className='main'>
                        <Row>
                            <Col xs='12' sm='12' md='7' lg='7' className='px-0'>
                                <BasicInfo pokemonInfo={this.state.info}/>
                            </Col>
                            <Col xs='12' sm='12' md='5' lg='5' className='px-5'>
                                <CustomCarousel pokemonSprites={this.state.sprites} />
                                <AsideInfo pokemonAsideInfo={this.state.asideInfo}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12' className='text-center mb-4'>
                                <h2>Evolution Chain</h2>
                            </Col>
                        </Row>
                        <EvolutionChain evolutionInfo={this.state.evolutionInfo}/>
                    </Container>
                </Container>
            </main>
        )
    }
}

export default PokemonContainer;
