import React from 'react'
import { Row, Col } from 'reactstrap';
import { map } from 'ramda';

import PokemonEvolution from '../pokemon-evolution/';

import Link from 'react-router-dom/es/Link';

const EvolutionChain = ({chain}) => {

    const pokemonEvolutionCreator = evolution => <PokemonEvolution key={evolution.name} evolution={evolution} game={chain.game}/>;

    if (chain.second.length === 0) { // no pokemon-basic-info-evolution chain
        return (
            <Row>
                <Col xs='12' sm='12' md='12' lg='12' className='text-center'>
                    <p className='mb-0'><strong>{chain.first.name}</strong></p>
                    <Link to={'/info/' + chain.first.name.toLowerCase() + '/' + chain.game} className='pokemon-link'>
                        <img src={chain.first.sprite} alt='Pokemon logo' className='d-block mx-auto'/>
                    </Link>
                    <p>This pokémon does not evolve or comes from any other pokémon.</p>
                </Col>
            </Row>
        );
    } else if (chain.third.length === 0) { // just one pokemon-basic-info-evolution
        return (
            <Row>
                <Col xs='12' sm='6' md='6' lg='6' className='text-center d-flex flex-column justify-content-center'>
                    <div>
                        <p className='mb-0'><strong>{chain.first.name}</strong></p>
                        <Link to={'/info/' + chain.first.name.toLowerCase() + '/' + chain.game} className='pokemon-link'>
                            <img src={chain.first.sprite} alt='Pokemon logo' className='d-block mx-auto'/>
                        </Link>
                    </div>
                </Col>
                <Col xs='12' sm='6' md='6' lg='6' className='text-center'>
                    {map(pokemonEvolutionCreator, chain.second)}
                </Col>
            </Row>
        );
    } else { // 2 evolutions
        return (
            <Row>
                <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                    <div>
                        <p className='mb-0'><strong>{chain.first.name}</strong></p>
                        <Link to={'/info/' + chain.first.name.toLowerCase() + '/' + chain.game} className='pokemon-link'>
                            <img src={chain.first.sprite} alt='Pokemon logo' className='d-block mx-auto'/>
                        </Link>
                    </div>
                </Col>
                <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                    {map(pokemonEvolutionCreator, chain.second)}
                </Col>
                <Col xs='12' sm='4' md='4' lg='4' className='text-center  d-flex flex-column justify-content-center'>
                    {map(pokemonEvolutionCreator, chain.third)}
                </Col>
            </Row>
        );
    }
};

export default EvolutionChain;