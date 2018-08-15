import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { map } from 'ramda';

import PokemonEvolution from '../pokemon-evolution/';

import './evolution-chain.scss'

class EvolutionChain extends Component {

    constructor(props) {
        super(props);

        this.state = {evolutionInfo: props.evolutionInfo};
    }

    pokemonEvolutionCreator = evolution => <PokemonEvolution key={evolution.name} evolution={evolution} />;

    render() {
        const {evolutionInfo} = this.state;
        if(evolutionInfo.second.length === 0){ // no pokemon-basic-info-evolution chain
            return (
                <Row>
                    <Col xs='12' sm='12' md='12' lg='12' className='text-center'>
                        <p className='mb-0'><strong>{evolutionInfo.first.name}</strong></p>
                            <img src={evolutionInfo.first.sprite} alt="Pokemon logo" className='d-block mx-auto' />
                            <p>This pokémon does not evolve or comes from any other pokémon.</p>
                    </Col>
                </Row>
            );
        } else if(evolutionInfo.third.length === 0) { // just one pokemon-basic-info-evolution
            return (
                <Row>
                    <Col xs='12' sm='6' md='6' lg='6' className='text-center d-flex flex-column justify-content-center'>
                        <div>
                            <p className='mb-0'><strong>{evolutionInfo.first.name}</strong></p>
                            <img src={evolutionInfo.first.sprite} alt="Pokemon logo" className='d-block mx-auto' />
                        </div>
                    </Col>
                    <Col xs='12' sm='6' md='6' lg='6' className='text-center'>
                        {map(this.pokemonEvolutionCreator, evolutionInfo.second)}
                    </Col>
                </Row>
            );
        } else { // 2 evolutions
            return (
                <Row>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                        <div>
                            <p className='mb-0'><strong>{evolutionInfo.first.name}</strong></p>
                            <img src={evolutionInfo.first.sprite} alt="Pokemon logo" className='d-block mx-auto'/>
                        </div>
                    </Col>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                        {map(this.pokemonEvolutionCreator, evolutionInfo.second)}
                    </Col>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center  d-flex flex-column justify-content-center'>
                        {map(this.pokemonEvolutionCreator, evolutionInfo.third)}
                    </Col>
                </Row>
            );
        }
    }
}

export default EvolutionChain;