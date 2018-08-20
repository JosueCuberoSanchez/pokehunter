/**
 * Pokemon container.
 * @author Josué David Cubero Sánchez.
 */

// Vendor components
import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
import LoadingScreen from '../../components/loading-screen/';

// Components
import BasicInfo from '../../components/pokemon-info/basic-info/';
import CustomCarousel from '../../components/pokemon-info/custom-carousel';
import AsideInfo from '../../components/pokemon-info/aside-info';
import EvolutionChain from '../../components/pokemon-info/evolution-chain';
import Error from '../../components/error/';

// SCSS
import './pokemon.scss';

// Redux
import connect from 'react-redux/es/connect/connect';
import * as actions from '../../redux/actionCreators/';

export class PokemonContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.params.name,
            game: this.props.params.game,
            isLoading: true,
            error: false
        }
    }

    componentDidMount() {
        this.props.fetchPokemon(this.state.name, this.state.game);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: nextProps.pokemon.isLoading, error: nextProps.pokemon.error});
        if(this.state.name !== nextProps.params.name) { // if link changed re-render
            this.setState({name: nextProps.params.name});
            this.props.fetchPokemon(nextProps.params.name, this.state.game);
        }
    }

    render () {
        if (this.state.isLoading) {
            return (
                <main>
                    <Container fluid={true} className='pt-4 pb-5'>
                        <Container className='main'>
                            <LoadingScreen pokemon={true}/>
                        </Container>
                    </Container>
                </main>
            );
        } else if (this.state.error) {
            return <Error />
        } else {
            return (
                <main>
                    <Container fluid={true} className='pt-4 pb-5'>
                        <Container className='main'>
                            <Row>
                                <Col xs='12' sm='12' md='7' lg='7' className='px-0'>
                                    <BasicInfo pokemonInfo={this.props.pokemon.basicInfo} game={this.props.pokemon.game}
                                    next={this.props.pokemon.next} previous={this.props.pokemon.previous}/>
                                </Col>
                                <Col xs='12' sm='12' md='5' lg='5' className='px-5'>
                                    <CustomCarousel sprites={this.props.pokemon.sprites}/>
                                    <AsideInfo pokemonAsideInfo={this.props.pokemon.asideInfo} number={this.props.pokemon.basicInfo.number}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs='12' sm='12' md='12' lg='12' className='text-center mb-4'>
                                    <h2>Evolution Chain</h2>
                                </Col>
                            </Row>
                            <EvolutionChain chain={this.props.pokemon.evolutionChain}/>
                        </Container>
                    </Container>
                </main>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { pokemon: state.pokemon};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPokemon: (name,game) => dispatch(actions.fetchPokemon(name,game))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);