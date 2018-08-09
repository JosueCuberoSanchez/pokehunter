/**
 * Pokemon container.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';

import CustomCarousel from "../../components/pokemon-info/custom-carousel";
import BasicInfo from '../../components/pokemon-info/basic-info/';
import ExtraInfo from '../../components/pokemon-info/extra-info/';

import './pokemon.scss';

export class PokemonContainer extends Component {
    render () {
        return (
            <main>
                <Container fluid={true} className='pt-4 pb-5'>
                    <Container className='main'>
                        <Row>
                            <Col xs='7' sm='7' md='7' lg='7' className='pl-4 pr-0 test'>
                                hue
                            </Col>
                            <Col xs='5' sm='5' md='5' lg='5' className='px-5 test'>
                                <CustomCarousel sprites={['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png']} />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </main>
        )
    }
}

export default PokemonContainer;
