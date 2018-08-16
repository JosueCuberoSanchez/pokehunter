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
import Error from '../../components/error/';

// Constants
import Constants from "../../constants";

// Helpers
import {fillLocationsArray, beautifyLocations, getEvolutionInfo} from '../../helpers/functions';

// SCSS
import './pokemon.scss';

// Images
import silhouette from "../../assets/img/content/silhouette.png";

// Redux
import connect from "react-redux/es/connect/connect";
import * as actions from "../../redux/actions";

export class PokemonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {  name: this.props.props.match.params.name,
                        game: this.props.props.match.params.game,
                        isLoading: true,
                        error: false
        }
    }

    componentDidMount() {
        this.fetchData(this.state.name);
    }

    componentWillReceiveProps(nextProps) {
        console.log('hola cambio')
        console.log(nextProps)
        //this.setState({name: nextProps.props.match.params.name, game: nextProps.props.match.params.game, isLoading: true, error: false});
        //console.log(this.state.name)
        this.fetchData(nextProps.props.match.params.name);
    }

    async fetchData(name) {
        // pokeapi wrapper variables
        const Pokedex = require('pokeapi-js-wrapper');
        const P = new Pokedex.Pokedex(Constants.POKEDEX_OPTIONS);

        try {
            const pokemonJSON = await P.getPokemonByName(name);

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

            const specieJSON = await P.getPokemonSpeciesByName(name);

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
            const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
            let locations = fillLocationsArray(encountersJSON, this.state.game);
            locations = beautifyLocations(locations);
            // Evolution chain
            const evolutionsJSON = await P.resource(specieJSON.evolution_chain.url);
            const evolutionInfo = await getEvolutionInfo(evolutionsJSON, P);

            this.props.fillBasicInfo({
                name: name.replace(/^\w/, c => c.toUpperCase()),
                number: number,
                height: pokemonJSON.height,
                weight: pokemonJSON.weight,
                types: types,
                generation: generation,
                description: description,
                locations: locations
            }); // Redux action
            this.props.fillAsideInfo({
                baseExperience: pokemonJSON.base_experience,
                baseHappiness: specieJSON.base_happiness,
                habitat: specieJSON.habitat.name.replace(/^\w/, c => c.toUpperCase())
            }); // Redux action
            this.props.fillSprites({
                frontDefault: sprites.front_default,
                backDefault: sprites.back_default,
                backShiny: sprites.back_shiny,
                frontShiny: sprites.front_shiny
            }); // Redux action
            this.props.fillEvolutionChain({
                first: evolutionInfo.first,
                second: evolutionInfo.second,
                third: evolutionInfo.third,
                game: this.state.game
            }); // Redux action

            this.setState({isLoading: false, name: name});

        } catch (error) {
            this.setState({
                error,
                isLoading: false
            })
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
        } /*else if (this.state.error) {
            return <Error />
        }*/
        return (
            <main>
                <Container fluid={true} className='pt-4 pb-5'>
                    <Container className='main'>
                        <Row>
                            <Col xs='12' sm='12' md='7' lg='7' className='px-0'>
                                <BasicInfo />
                            </Col>
                            <Col xs='12' sm='12' md='5' lg='5' className='px-5'>
                                <CustomCarousel />
                                <AsideInfo />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12' className='text-center mb-4'>
                                <h2>Evolution Chain</h2>
                            </Col>
                        </Row>
                        <EvolutionChain />
                    </Container>
                </Container>
            </main>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fillBasicInfo: basicInfo => dispatch(actions.fillBasicInfo(basicInfo)),
        fillAsideInfo: asideInfo => dispatch(actions.fillAsideInfo(asideInfo)),
        fillSprites: sprites => dispatch(actions.fillSprites(sprites)),
        fillEvolutionChain: evolutionChain => dispatch(actions.fillEvolutionChain(evolutionChain))
    };
};

export default connect(null, mapDispatchToProps)(PokemonContainer);
