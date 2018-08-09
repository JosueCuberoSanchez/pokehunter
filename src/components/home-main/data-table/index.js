/**
 * Data table component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import LoadingScreen from 'react-loading-screen';
import axios from 'axios';

import Constants from './constants';
import './data-table.scss';

import silhouette from '../../../assets/img/content/silhouette.png';

const columns = [{
    dataField: 'sprite',
    text: 'Sprite'
}, {
    dataField: 'name',
    text: 'Name',
    sort: true
}, {
    dataField: 'number',
    text: 'Pokédex No.',
    sort: true
}, {
    dataField: 'location',
    text: 'Location'
}];

const SearchBar = (props) => {
    let input;
    const handleChange = () => {
        props.onSearch(input.value);
    };
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
                <label htmlFor="filter">Search anything</label>
                <input
                    className="form-control "
                    ref={n => input = n}
                    type="text"
                    onChange={handleChange}
                    id="filter"
                    placeholder="Search something, trainer."
                />
            </div>
        </div>
    );
};

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

    componentDidMount() {
        this.setState({isLoading: true});
        this.fetchData();
    }

    async fetchData() {

        let sprite;
        let name;
        let number;
        let locations;

        for (let i = 1; i < 11; i++) {

            locations = []; //restart locations array

            try {
                // Basic pokemon info
                const pokemonJSON = await axios.get(Constants.BASE_URL + Constants.API_URL + Constants.POKEMON + i + Constants.SLASH);

                // Get name and pokedex entry
                name = pokemonJSON.data.name;
                number = pokemonJSON.data.id;

                // Pokemon sprite
                const spritesJSON = await axios.get(pokemonJSON.data.forms[0].url);
                sprite = <img src={spritesJSON.data.sprites.front_default} className="d-block mx-auto"/>;

                // Pokemon locations
                const encountersJSON = await axios.get(Constants.BASE_URL + pokemonJSON.data.location_area_encounters);

                this.fillLocationsArray(locations, encountersJSON.data);
                this.beautifyLocations(locations);

                // Inject pokemon to table
                this.state.pokemons.push({
                    sprite: sprite,
                    name: name,
                    number: number,
                    location: locations.join(', ')
                });

                // Update state
                if ((i % 5) === 0)
                    this.setState({pokemons: this.state.pokemons, isLoading: false})
            } catch (error) {
                console.log("Something went wrong fetching data");
            }
        }
    };

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
                            locations.push(encounterDetail.location_area.name);
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
        if (locationsSize !== 0) {
            let location;
            for (let l = 0; l < locationsSize; l++) {
                location = locations[l].split("-").join(" ");
                locations[l] = location;
            }
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
        }
        return (
            <div>
                <section>
                    <ToolkitProvider keyField='number' data={this.state.pokemons} columns={columns} search>
                        {
                            props => (
                                <div>
                                    <SearchBar {...props.searchProps} />
                                    <br/>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        pagination={paginationFactory()}
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

export default DataTable;
