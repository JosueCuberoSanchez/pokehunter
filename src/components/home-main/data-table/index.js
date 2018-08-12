/**
 * Data table component.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import LoadingScreen from 'react-loading-screen';

// Images
import silhouette from '../../../assets/img/content/silhouette.png';

// Components
import Constants from './constants';
import SearchBar from '../search-bar/'

// SCSS
import './data-table.scss';

class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemons: [],
            isLoading: false,
            error: null,
            game: props.game
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.game !== nextProps.game) {
            this.setState({game: nextProps.game, pokemons: []});
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {

        this.setState({isLoading: true});

        // Variables needed by wrapper
        let Pokedex = require('pokeapi-js-wrapper');
        let options = {
            protocol: 'https',
            hostName: 'pokeapi.co:443',
            versionPath: '/api/v2/',
            cache: true,
            timeout: 5 * 1000 // 5s
        };
        let P = new Pokedex.Pokedex(options);

        // Variables to inject
        let sprite;
        let name;
        let nameLink;
        let number;
        let locations;

        for (let i = 1; i < 11; i++) {

            locations = []; //restart locations array

            // Basic pokemon info
            const pokemonJSON = await P.getPokemonByName(i);
            // console.log(pokemonJSON);

            // Get name
            name = pokemonJSON.name.replace(/^\w/, c => c.toUpperCase());

            // Get pokedex entry
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

            // Pokemon sprite
            sprite = <Link to={'/info/?pokemon='+name+'&game='+this.state.game} className='pokemon-link'><img src={pokemonJSON.sprites.front_default} className="d-block mx-auto"/></Link>

            // Pokemon locations
            const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
            this.fillLocationsArray(locations, encountersJSON);
            this.beautifyLocations(locations);

            // Inject pokemon to table
            this.state.pokemons.push({
                sprite: sprite,
                name: name,
                number: number,
                location: locations.join(', ')
            });

            // Update state
            if ((i % 10) === 0)
                this.setState({pokemons: this.state.pokemons, isLoading: false})
        }
    }

    render() {
        //console.log(this.state.game);

        if (this.state.isLoading) {
            return (
                <LoadingScreen
                    loading={true}
                    bgColor='transparent'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    logoSrc={silhouette}
                    text='Wait a second, searching your Pokémons...'>
                    <div/>
                </LoadingScreen>
            );
        }
        return (
            <div>
                <section>
                    <ToolkitProvider keyField='number' data={this.state.pokemons} columns={Constants.COLUMNS} search>
                        {
                            props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <br/>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
                                        striped = {true}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </section>
            </div>
        );
    }

    fillLocationsArray(locations, encountersJSON) {
        if (encountersJSON.length === 0) {
            locations[0] = 'Location unknown';
        } else {
            for (let j = 0; j < encountersJSON.length; j++) {
                let encounterDetail = encountersJSON[j];
                for (let k = 0; k < encounterDetail.version_details.length; k++) {
                    let versionDetail = encounterDetail.version_details[k];
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

}

export default DataTable;
