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
import silhouette from '../../assets/img/content/silhouette.png';

// Components
import SearchBar from '../../components/home/search-bar/index';
import Error from '../../components/error/index';

// SCSS
import './data-table.scss';

// Helpers
import {fillLocationsArray, beautifyLocations, getPokedexLimit} from "../../helpers/functions";

// Constants
import Constants from "../../constants";

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
        let P = new Pokedex.Pokedex(Constants.POKEDEX_OPTIONS);

        // Variables to inject
        let sprite;
        let name;
        let number;
        let locations;
        let limit = getPokedexLimit(this.state.game);

        for (let i = 1; i < 71; i++) {

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
                // console.log(name + ' ' + Constants.BASE_URL + pokemonJSON.location_area_encounters)
                const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
                // console.log(this.state.game + ' search');
                locations = fillLocationsArray(encountersJSON, this.state.game);
                locations = beautifyLocations(locations);

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
}

const mapStateToProps = state => {
    return { game: state.dataTable.game };
};

//export default DataTable;
export default connect(mapStateToProps)(DataTable);
