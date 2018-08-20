/**
 * Pokemon page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

// Containers
import PokemonContainer from '../../containers/pokemon/';

class Pokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {props: props}
    }

    componentWillReceiveProps(nextState) {
        if(nextState.match.params.name !== this.state.props.match.params.name) { // if link changed set state and re-render container
            this.setState({props: nextState});
        }
    }

    render () {
        return (
            <PokemonContainer params={this.state.props.match.params}/>
        )
    }
}

export default Pokemon;
