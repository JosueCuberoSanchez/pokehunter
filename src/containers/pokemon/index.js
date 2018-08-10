/**
 * Pokemon container.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
const queryString = require('query-string');

import CustomCarousel from "../../components/pokemon-info/custom-carousel";
import BasicInfo from '../../components/pokemon-info/basic-info/';

import './pokemon.scss';
import LoadingScreen from "react-loading-screen";
import silhouette from "../../assets/img/content/silhouette.png";
import Constants from "../../components/home-main/data-table/constants";

export class PokemonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {  pokemon: queryString.parse(props.props.location.search).pokemon, game: queryString.parse(props.props.location.search).game,
                        isLoading: true, name:'', number:'', height:'', weight:'', frontDefault:'', backDefault:'', frontShiny:'', backShiny:'',
                        types:[], generation:'', description:'', locations: []}
    }

    async componentDidMount() {
        let Pokedex = require('pokeapi-js-wrapper');
        let options = {
            protocol: 'https',
            hostName: 'pokeapi.co:443',
            versionPath: '/api/v2/',
            cache: true,
            timeout: 5 * 1000 // 5s
        };
        let P = new Pokedex.Pokedex(options);
        let name = this.state.pokemon.toLowerCase();
        const pokemonJSON = await P.getPokemonByName(name);

        let number;
        switch(pokemonJSON.id.toString().length){
            case 1:
                number = '00'+pokemonJSON.id;
                break;
            case 2:
                number = '0'+pokemonJSON.id;
                break;
            default:
                number = pokemonJSON.id;
                break;
        }

        let sprites = pokemonJSON.sprites;

        let types = [];
        for (var j = 0; j < pokemonJSON.types.length; j++) {
            types.push(pokemonJSON.types[j].type.name)
        }

        const specieJSON = await P.getPokemonSpeciesByName(name);

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

        let description = '';
        for (var j = 0; j < specieJSON.flavor_text_entries.length; j++) {
            if (specieJSON.flavor_text_entries[j].version.name === this.state.game)
                description = specieJSON.flavor_text_entries[j].flavor_text;
        }

        // Pokemon locations
        const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
        let locations = [];
        this.fillLocationsArray(locations, encountersJSON);
        this.beautifyLocations(locations);

        this.setState({isLoading: false, name: this.state.pokemon, number: number, height: pokemonJSON.height, weight: pokemonJSON.weight,
                       frontDefault: sprites.front_default, backDefault: sprites.back_default, backShiny: sprites.back_shiny,
                       frontShiny: sprites.front_shiny, types: types, generation: generation, description: description, locations: locations})
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
        }
        return (
            <main>
                <Container fluid={true} className='pt-4 pb-5'>
                    <Container className='main'>
                        <Row>
                            <Col xs='7' sm='7' md='7' lg='7' className='pl-4 pr-0 test'>
                                <BasicInfo name={this.state.name} number={this.state.number} generation={this.state.generation}
                                           description={this.state.description} weight={this.state.weight} height={this.state.height}
                                           types={this.state.types} locations={this.state.locations}/>
                            </Col>
                            <Col xs='5' sm='5' md='5' lg='5' className='px-5 test'>
                                <CustomCarousel sprites={[this.state.frontDefault, this.state.backDefault, this.state.frontShiny, this.state.backShiny]} />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        )
    }
}

export default PokemonContainer;
