/**
 * Pokemon basic information component.
 * @author Josué David Cubero Sánchez.
 */

import React from 'react';

import './basic-info.scss';

import { pokemonBasicInfo, pokemonBasicInfoDefault } from '../../../proptypes/index'

// Redux
import connect from "react-redux/es/connect/connect";

const BasicInfo = ({pokemonInfo}) => {

    function getTypes() { //get types sprites
        let typesContent;
        if(pokemonInfo.types.length === 1) {
            typesContent = <div className='ml-3'>{getSprite(pokemonInfo.types[0])}</div>;
        } else {
            typesContent = <div className='ml-3'>{getSprite(pokemonInfo.types[1])} {getSprite(pokemonInfo.types[0])}</div>;
        }
        return typesContent;
    }


    function getSprite(type) { // get type sprite, i tag uses a mixin to set up background image from a types sprite.
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
                typeSprite = <i className='basic-info__sprite basic-info__sprite--electric'></i>;
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

    return (
        <div className='basic-info'>
            <h1 className='text-center my-4'>{pokemonInfo.name}</h1>
            <div className='basic-info__row pl-4'><p><strong>Pokédex No.:</strong> {pokemonInfo.number}</p></div>
            <div className='basic-info__row pl-4'><p><strong>Pokédex description:</strong> {pokemonInfo.description}</p></div>
            <div className='basic-info__row d-flex pl-4'><p><strong>Type(s):</strong></p>{getTypes()}</div>
            <div className='basic-info__row pl-4'><p><strong>Generation:</strong> {pokemonInfo.generation}</p></div>
            <div className='basic-info__row pl-4'><p><strong>Height:</strong> {pokemonInfo.height/10} m</p></div>
            <div className='basic-info__row pl-4'><p><strong>Weight:</strong> {pokemonInfo.weight/10} kg</p></div>
            <div className='basic-info__row pl-4'><p><strong>Locations:</strong> {pokemonInfo.locations}</p></div>
        </div>
    )
};

BasicInfo.propTypes = {
    pokemonInfo: pokemonBasicInfo
};

BasicInfo.defaultProps = {
    pokemonInfo: pokemonBasicInfoDefault
};

const mapStateToProps = state => {
    return {
        pokemonInfo: state.pokemon.basicInfo
    };
};

export default connect(mapStateToProps)(BasicInfo);