/**
 * Search form component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import { Label, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import DataTable from '../../../containers/data-table/index';
import { connect } from "react-redux";
import { fillTable } from "../../../redux/actions/index";

import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewTable: false,
            gameInvalid: false,
            dropdownOpen: false,
            dropDownValue: 'Pick a game!',
            shouldUpdate: true
        };

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        const prevTableState = this.props.tableState;
        if(prevTableState !== '') {
            this.props.fillTable(prevTableState); // Redux action
            this.setState({dropDownValue: prevTableState.replace(/^\w/, c => c.toUpperCase()), viewTable: true});
        }
    }

    render() {
        return (
            <Container className="main">
                <Label htmlFor="filter-by-game" className='mt-3'>Chose a Pokémon game</Label>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="filter-by-game" className='mb-3'>
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

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeValue(e) {
        let game = e.currentTarget.textContent.toString();
        let gameForProps = game.toLowerCase().replace(/\s/g, "-");
        this.props.fillTable(gameForProps); // Redux action
        this.setState({dropDownValue: game, viewTable: true});
    }

}

const mapStateToProps = state => {
    return {
        tableState: state.dataTable.game
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fillTable: game => dispatch(fillTable(game))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);