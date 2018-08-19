/**
 * Header component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';
import {Navbar, NavbarBrand, NavLink, Container, Row, Col} from 'reactstrap';

import logo from'../../assets/img/content/logo.png';
import trainer from'../../assets/img/content/trainer.png';

import './footer.scss';

const Footer = ()  => {
    return (
        <footer>
            <Navbar expand='sm'>
                <Container fluid={true}>
                    <Container>
                        <Row>
                            <Col xs='12' sm='6' md='6' lg='6' className='d-flex'>
                                <NavbarBrand className='mr-0 navbar__small-text justify-content-center align-self-center' href='https://pokeapi.co/'>
                                    <img src={logo} alt='Pokéhunter logo' className='w-50 mr-2'/>
                                    powered by PokéAPI
                                </NavbarBrand>
                            </Col>
                            <Col xs='12' sm={{ size: 5, offset: 1 }} md={{ size: 5, offset: 1 }} lg={{ size: 5, offset: 1 }}>
                                <NavLink className='pl-3 navbar__link' href='https://josuecuberosanchez.github.io/Developer_portfolio/'>
                                    Meet the author trainer
                                    <img src={trainer} alt='Pokéhunter trainer' className='navbar__trainer ml-4'/>
                                </NavLink>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;