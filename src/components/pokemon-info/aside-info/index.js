import React from 'react'

import './aside-info.scss'
import {pokemonAsideInfo, pokemonAsideInfoDefault} from "../../../proptypes";

const AsideInfo = ({pokemonAsideInfo}) => {
    return (
        <div className='aside-info'>
            <div className='aside-info__row'><p><strong>Base experience:</strong> {pokemonAsideInfo.baseExperience}</p></div>
            <div className='aside-info__row'><p><strong>Base happiness:</strong> {pokemonAsideInfo.baseHappiness}</p></div>
            <div className='aside-info__row'><p><strong>Habitat:</strong> {pokemonAsideInfo.habitat}</p></div>
        </div>
    );
};

AsideInfo.propTypes = {
    pokemonAsideInfo: pokemonAsideInfo
};

AsideInfo.defaultProps = {
    pokemonAsideInfo: pokemonAsideInfoDefault
};

export default AsideInfo;