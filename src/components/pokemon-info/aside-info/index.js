import React, { Component } from 'react'

import './aside-info.scss'
import {pokemonAsideInfo, pokemonAsideInfoDefault} from '../../../proptypes';

class AsideInfo extends Component {

    constructor(props){
        super(props);
        this.state =
            {pokemonAsideInfo: props.pokemonAsideInfo, number: props.number}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({number: nextProps.number});
        this.refs.audio.pause();
        this.refs.audio.load();
    }

    render() {

        const cry = require('../../../assets/audio/cries/' + parseInt(this.state.number) + '.ogg');

        return (
            <div className='aside-info'>
                <audio controls={true} className='w-100 mb-3' ref='audio'><source src={cry} type='audio/ogg' /></audio>
                <div className='aside-info__row'><p><strong>Base experience:</strong> {this.state.pokemonAsideInfo.baseExperience}</p></div>
                <div className='aside-info__row'><p><strong>Base happiness:</strong> {this.state.pokemonAsideInfo.baseHappiness}</p></div>
            </div>
        )
    }
}

AsideInfo.propTypes = {
    pokemonAsideInfo: pokemonAsideInfo
};

AsideInfo.defaultProps = {
    pokemonAsideInfo: pokemonAsideInfoDefault
};

export default AsideInfo;
