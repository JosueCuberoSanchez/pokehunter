/**
 * Search form component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import { Label, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import DataTable from '../../../containers/data-table/index';
import { connect } from "react-redux";
import { fillDataTable } from "../../../redux/actionCreators/index";

import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewTable: false,
            dropDownOpen: false,
            dropDownValue: 'Pick a game!'
        };
    }

    componentDidMount() { //used to check if there was a previous state for the table.
        const prevTableState = this.props.tableState; // the previous state stored on Redux store
        if(prevTableState !== '') { // if it's null it means we come from a page refresh
            this.props.fillDataTable(prevTableState); // Redux action to fill the table with the previous data
            const dropDownValue = prevTableState.replace(/^\w/, c => c.toUpperCase()); // beautify the value
            this.setState({dropDownValue: dropDownValue, viewTable: true}); // Render the table with the previous state
        }
    }

    render() {
        return (
            <Container className="main">
                <Label htmlFor="filter-by-game" className='mt-3'>Chose a Pokémon game</Label>
                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle} id="filter-by-game" className='mb-3'>
                    <DropdownToggle caret>
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.changeValue}>Red</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Blue</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Yellow</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>FireRed</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>LeafGreen</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>Gold</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Silver</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Crystal</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>Ruby</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Sapphire</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Emerald</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Alpha Sapphire</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Omega Ruby</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>Diamond</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Pearl</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Platinum</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>White</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Black</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>White 2</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Black 2</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>X</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Y</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {
                    this.state.viewTable
                        ? <DataTable />
                        : null
                }
            </Container>
        )
    }

    toggle = () => { // open or close dropDown
        this.setState(prevState => ({
            dropDownOpen: !prevState.dropDownOpen
        }));
    };

    changeValue = (e) => { // change dropDown value when user selects a game
        let game = e.currentTarget.textContent.toString(); // get the game
        if(this.state.dropDownValue !== game) { // if the user chose the same game, do not render again...
            let gameForProps = game.toLowerCase().replace(/\s/g, "-"); // pass the game on lower case to Redux state
            this.props.fillDataTable(gameForProps); // Redux action
            this.setState({dropDownValue: game, viewTable: true}); // Render table
        }
    };

}

const mapStateToProps = state => {
    return {
        tableState: state.dataTable.game // Get the previous history from Redux
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fillDataTable: game => dispatch(fillDataTable(game)) // Send game to Redux state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
