/**
 * Pokemon container.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
import LoadingScreen from "react-loading-screen";

// Components
import CustomCarousel from "../../components/pokemon-info/custom-carousel";
import BasicInfo from '../../components/pokemon-info/basic-info/';
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
                        error: null
        }
    }

    async componentDidMount() {

        // pokeapi wrapper variables
        let Pokedex = require('pokeapi-js-wrapper');
        let options = {
            protocol: 'https',
            hostName: 'pokeapi.co:443',
            versionPath: '/api/v2/',
            cache: true,
            timeout: 5 * 1000 // 5s
        };
        let P = new Pokedex.Pokedex(options);

        try {
            const pokemonJSON = await P.getPokemonByName(this.state.name);

            let sprites = pokemonJSON.sprites;

            let number;
            switch (pokemonJSON.id.toString().length) {
                case 1:
                    number = '00' + pokemonJSON.id;
                    break;
                case 2:
                    number = '0' + pokemonJSON.id;
                    break;
                default:
                    number = pokemonJSON.id;
                    break;
            }

            const specieJSON = await P.getPokemonSpeciesByName(this.state.name);

            let description = '';
            for (var j = 0; j < specieJSON.flavor_text_entries.length; j++) {
                if (specieJSON.flavor_text_entries[j].version.name === this.state.game && specieJSON.flavor_text_entries[j].language.name === 'en')
                    description = specieJSON.flavor_text_entries[j].flavor_text;
            }

            if (description === '')
                description = 'This description is missing in the PokeAPI';

            let types = [];
            for (var j = 0; j < pokemonJSON.types.length; j++) {
                types.push(pokemonJSON.types[j].type.name)
            }

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
            this.fillLocationsArray(locations, encountersJSON);
            this.beautifyLocations(locations);

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
                    locations: locations.join(', ')
                },
                sprites: {
                    frontDefault: sprites.front_default,
                    backDefault: sprites.back_default,
                    backShiny: sprites.back_shiny,
                    frontShiny: sprites.front_shiny
                }
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
    }

    beautifyLocations(locations) {
        const locationsSize = locations.length;
        if (locationsSize !== 0 && locations[0] !== 'Location unknown') {
            let location;
            for (let l = 0; l < locationsSize; l++) {
                location = locations[l].split("-");
                location.pop();
                locations[l] = location.join(" ");
            }
        }
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
        } else if (this.state.error) {
            return <Error />
        }
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
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        )
    }
}

export default PokemonContainer;
