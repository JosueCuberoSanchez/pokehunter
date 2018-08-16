/**
 * Search form component.
 * @author Josué David Cubero Sánchez.
 */

import React, {Component} from 'react';
import { Label, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import DataTable from '../data-table/';
import { connect } from "react-redux";
import { fillTable } from "../../redux/actions/";

import './home.scss';

class HomeContainer extends Component {
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
                        <DropdownItem divider />
                        <DropdownItem onClick={this.changeValue}>Sun</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>Moon</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>UltraSun</DropdownItem>
                        <DropdownItem onClick={this.changeValue}>UltraMoon</DropdownItem>
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

const mapDispatchToProps = dispatch => {
    return {
        fillTable: game => dispatch(fillTable(game))
    };
};

export default connect(null, mapDispatchToProps)(HomeContainer);