/**
 * Pokemon basic information component.
 * @author Josué David Cubero Sánchez.
 */

import React, { Component } from 'react';

import './basic-info.scss';
import sprite from'../../../assets/img/content/types.png';

class BasicInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {props: props};
    }

    render() {

            return (
            <div className='basic-info'>
                <h1 className='text-center my-4'>{this.state.props.name}</h1>
                <div className='basic-info__row'><p><strong>Pokédex No.:</strong> {this.state.props.number}</p></div>
                <div className='basic-info__row'><p><strong>Pokédex description:</strong> {this.state.props.description}</p></div>
                <div className='basic-info__row d-flex'><p><strong>Type(s):</strong></p>{this.getTypes()}</div>
                <div className='basic-info__row'><p><strong>Generation:</strong> {this.state.props.generation}</p></div>
                <div className='basic-info__row'><p><strong>Height:</strong> {this.state.props.height}</p></div>
                <div className='basic-info__row'><p><strong>Weight:</strong> {this.state.props.weight}</p></div>
                <div className='basic-info__row'><p><strong>Locations:</strong> {this.state.props.locations}</p></div>
            </div>
        );
    }

    getTypes() {
        let types;
        if(this.state.props.types.length === 1) {
            types = <div className='ml-3'>{this.getSprite(this.state.props.types[0])}</div>;
        } else {
            types = <div className='ml-3'>{this.getSprite(this.state.props.types[1])} {this.getSprite(this.state.props.types[0])}</div>;
        }
        return types;
    }


    getSprite(type){
        let typeSprite;
        switch (type) {
            case 'grass':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--grass'></i>;
                break;
            case 'normal':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--normal'></i>;
                break;
            case 'fire':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--fire'></i>;
                break;
            case 'water':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--water'></i>;
                break;
            case 'fighting':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--fighting'></i>;
                break;
            case 'flying':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--flying'></i>;
                break;
            case 'poison':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--poison'></i>;
                break;
            case 'ground':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--ground'></i>;
                break;
            case 'rock':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--rock'></i>;
                break;
            case 'bug':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--bug'></i>;
                break;
            case 'ghost':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--ghost'></i>;
                break;
            case 'electric':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--electric'>huee</i>;
                break;
            case 'psychic':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--psychic'></i>;
                break;
            case 'ice':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--ice'></i>;
                break;
            case 'dragon':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--dragon'></i>;
                break;
            case 'dark':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--dark'></i>;
                break;
            case 'steel':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--steel'></i>;
                break;
            case 'fairy':
                typeSprite = <i className='basic-info__sprite basic-info__sprite--fairy'></i>;
                break;
        }
        return typeSprite;
    }
}

export default BasicInfo;