/**
 * Data table component.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import LoadingScreen from '../../components/loading-screen/';

// Components
import SearchBar from '../../components/home/search-bar/index';
import Error from '../../components/error/index';

// SCSS
import './data-table.scss';

// Constants
import Constants from '../../helpers/constants';

// Redux
import { connect } from 'react-redux';
import { fillDataTable } from '../../redux/actionCreators';

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
            this.setState({game: nextProps.game, pokemons: nextProps.pokemons, isLoading: nextProps.isLoading});
        } else if(this.state.pokemons !== nextProps.pokemons) { // this link vs next link
            this.setState({pokemons: nextProps.pokemons, isLoading: nextProps.isLoading});
        }
    }

    componentDidMount() {
        this.state.fillDataTable({game: this.state.game}); // fill table
    }

    render() {

        if (this.state.isLoading) {
            return (
                <LoadingScreen />
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
    return { game: state.dataTable.game, isLoading: state.dataTable.isLoading, error: state.dataTable.error, pokemons: state.dataTable.pokemons };
};

const mapDispatchToProps = {
    fillDataTable
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
