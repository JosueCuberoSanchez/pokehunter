/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';
import {Navbar, NavbarBrand, NavItem, NavLink, Container, Row, Col} from 'reactstrap';

import logo from'../../assets/img/content/logo.png';

import './header.scss';

const Header = ()  => {
    return (
        <header>
            <Navbar expand="md">
                <Container fluid={true}>
                    <Container>
                        <Row>
                            <Col xs="12" sm="6" md="4" lg="3">
                                <NavbarBrand className="mr-0" href="/"><img src={logo} alt="Pokéhunter logo" className="w-100 d-block mx-auto"/></NavbarBrand>
                            </Col>
                            <Col xs="12" sm={{ size: 2, offset: 2 }} md={{ size: 3, offset: 5 }} lg={{ size: 3, offset: 6 }} className='align-items-center d-flex'>
                                <ul className="d-flex justify-content-between align pl-0 mb-0">
                                    <NavItem>
                                        <NavLink href="about.html">About</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="https://pokeapi.co/">API</NavLink>
                                    </NavItem>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;