/**
 * Data table component.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import LoadingScreen from '../../loading-screen/index';

// Components
import SearchBar from '../search-bar/index';
import Error from '../../error/index';

// SCSS
import './data-table.scss';

// Constants
import Constants from '../../../helpers/constants';

class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemons: props.pokemons,
            isLoading: props.isLoading,
            error: props.error,
            game: props.game,
            fillDataTable: (game) => {}
        };
    }

    componentWillReceiveProps(nextProps) { //checks if the state change is a game change or a browser back change.
        if(this.state.game !== nextProps.game) {
            this.setState({game: nextProps.game, pokemons: nextProps.pokemons, isLoading: nextProps.isLoading, error: nextProps.error});
        } else if(this.state.pokemons !== nextProps.pokemons) { // this link vs next link
            this.setState({pokemons: nextProps.pokemons, isLoading: nextProps.isLoading, error: nextProps.error});
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingScreen pokemon={false}/>
            );
        } else if (this.state.error) {
            return <Error pokemon={false}/>
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

export default DataTable;
