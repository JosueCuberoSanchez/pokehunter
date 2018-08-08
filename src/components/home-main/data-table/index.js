/**
 * Data table component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const pokemons = [
    {
    sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                 className="d-block mx-auto"/>,
    name: 'Bulbasaur',
    number: '001',
    location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Bulbasaur',
        number: '001',
        location: 'Location Unknown'
    },
    {
        sprite: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                     className="d-block mx-auto"/>,
        name: 'Charmander',
        number: '002',
        location: 'Location Unknown'
    }];

const columns = [{
    dataField: 'sprite',
    text: 'Sprite'
}, {
    dataField: 'name',
    text: 'Name'
}, {
    dataField: 'number',
    text: 'Pokédex No.'
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
                    ref={ n => input = n }
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
    }

    render() {
        return (
            <div>
                <section>
                    <ToolkitProvider
                        keyField='number'
                        data={pokemons}
                        columns={columns}
                        search>
                        {
                            props => (
                                <div>
                                    <SearchBar { ...props.searchProps } />
                                    <br/>
                                    <BootstrapTable
                                        { ...props.baseProps }
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