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
import Constants from '../../../constants/';
import SearchBar from '../search-bar/';
import Error from '../../error/';

// SCSS
import './data-table.scss';

// Redux
import { connect } from 'react-redux';

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
            timeout: 10 * 1000 // 5s
        };
        let P = new Pokedex.Pokedex(options);

        // Variables to inject
        let sprite;
        let name;
        let number;
        let locations;
        let limit = this.getPokedexLimit();

        for (let i = 1; i < 61; i++) {

            locations = []; //restart locations array

                // Basic pokemon-basic-info info
                const pokemonJSON = await P.getPokemonByName(i);
                // console.log(pokemonJSON);

                // Get name
                name = pokemonJSON.name;

                // Get pokedex entry
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

                // Pokemon sprite
                sprite = <Link to={'/info/' + name + '/' + this.state.game} className='pokemon-link'><img
                    src={pokemonJSON.sprites.front_default} className="d-block mx-auto"/></Link>;
                name = name.replace(/^\w/, c => c.toUpperCase());

                // Pokemon locations
                const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
                locations = this.fillLocationsArray(locations, encountersJSON);
                locations = this.beautifyLocations(locations);

                // Inject pokemon-basic-info to table
                this.state.pokemons.push({
                    sprite: sprite,
                    name: name,
                    number: number,
                    location: locations
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
        } else if (this.state.error) {
            return <Error />
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

    getPokedexLimit() {
        let limit;
        switch (this.state.game) {
            case 'red':
            case 'blue':
            case 'yellow':
                limit = 151;
                break;
            case 'gold':
            case 'silver':
            case 'crystal':
                limit = 251;
                break;
            case 'ruby':
            case 'sapphire':
            case 'firered':
            case 'leafgreen':
                limit = 439;
                break;
            case 'diamond':
            case 'pearl':
            case 'platinum':
                limit = 507;
                break;
            case 'white':
            case 'black':
            case 'white-2':
            case 'black-2':
                limit = 651;
                break;
            case 'x':
            case 'y':
            case 'alpha-sapphire':
            case 'omega-ruby':
                limit = 721;
                break;
            case 'moon':
            case 'sun':
            case 'ultramoon':
            case 'ultrasun':
                limit = 807;
                break;
        }
        return limit;
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
        return locations;
    }

    beautifyLocations(locations) {
        return locations.map(function(location) {
            return location.split('-').join(' ');
        }).join(', ');
    }

}

const mapStateToProps = state => ({
    pokemons: state.pokemons,
    isLoading: state.isLoading,
    error: state.error,
    game: state.game
});

const mapDispatchToProps = dispatch => ({
    getAllDocuments:() => dispatch({
        type: 'GET_POKEMON_REQUEST'
    })
});

export default DataTable;
//export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
