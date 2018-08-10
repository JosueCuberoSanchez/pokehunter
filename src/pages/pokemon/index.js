/**
 * Pokemon page.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import PokemonContainer from '../../containers/pokemon/';

class Pokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {props: props}
    }


    render () {
        return (
            <PokemonContainer props={this.state.props}/>
        )
    }
}

export default Pokemon;
