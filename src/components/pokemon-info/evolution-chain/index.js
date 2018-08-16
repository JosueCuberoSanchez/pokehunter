import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import { map } from 'ramda';

import PokemonEvolution from '../pokemon-evolution/';

import './evolution-chain.scss'
import connect from "react-redux/es/connect/connect";
import Link from "react-router-dom/es/Link";

class EvolutionChain extends Component {

    constructor(props) {
        super(props);

        this.state = {first: props.first, second: props.second, third: props.third, game: props.game};
    }

    pokemonEvolutionCreator = evolution => <PokemonEvolution key={evolution.name} evolution={evolution} game={this.state.game} />;

    render() {
        const {first, second, third, game} = this.state;

        if(second.length === 0){ // no pokemon-basic-info-evolution chain
            return (
                <Row>
                    <Col xs='12' sm='12' md='12' lg='12' className='text-center'>
                        <p className='mb-0'><strong>{first.name}</strong></p>
                        <Link to={'/info/' + first.name.toLowerCase() + '/' + game} className='pokemon-link'>
                            <img src={first.sprite} alt="Pokemon logo" className='d-block mx-auto' />
                        </Link>
                        <p>This pokémon does not evolve or comes from any other pokémon.</p>
                    </Col>
                </Row>
            );
        } else if(third.length === 0) { // just one pokemon-basic-info-evolution
            return (
                <Row>
                    <Col xs='12' sm='6' md='6' lg='6' className='text-center d-flex flex-column justify-content-center'>
                        <div>
                            <p className='mb-0'><strong>{first.name}</strong></p>
                            <Link to={'/info/' + first.name.toLowerCase() + '/' + game} className='pokemon-link'>
                                <img src={first.sprite} alt="Pokemon logo" className='d-block mx-auto' />
                            </Link>
                        </div>
                    </Col>
                    <Col xs='12' sm='6' md='6' lg='6' className='text-center'>
                        {map(this.pokemonEvolutionCreator, second)}
                    </Col>
                </Row>
            );
        } else { // 2 evolutions
            return (
                <Row>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                        <div>
                            <p className='mb-0'><strong>{first.name}</strong></p>
                            <Link to={'/info/' + first.name.toLowerCase() + '/' + game} className='pokemon-link'>
                                <img src={first.sprite} alt="Pokemon logo" className='d-block mx-auto'/>
                            </Link>
                        </div>
                    </Col>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center d-flex flex-column justify-content-center'>
                        {map(this.pokemonEvolutionCreator, second)}
                    </Col>
                    <Col xs='12' sm='4' md='4' lg='4' className='text-center  d-flex flex-column justify-content-center'>
                        {map(this.pokemonEvolutionCreator, third)}
                    </Col>
                </Row>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        first: state.evolutionChain.first,
        second: state.evolutionChain.second,
        third: state.evolutionChain.third,
        game: state.evolutionChain.game
    };
};

export default connect(mapStateToProps)(EvolutionChain);