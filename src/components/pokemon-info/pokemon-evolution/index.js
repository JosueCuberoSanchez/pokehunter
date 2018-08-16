import React from 'react'
import Link from "react-router-dom/es/Link";

const PokemonEvolution = ({ evolution, game }) => {
    return (
        <div className='mb-5'>
            <p className='mb-0'><strong>{evolution.name}</strong></p>
            <Link to={'/info/' + evolution.name.toLowerCase() + '/' + game} className='pokemon-link'>
                <img src={evolution.sprite} alt="Pokemon logo" className='d-block mx-auto' />
            </Link>
            <p>{evolution.trigger}</p>
        </div>
    )
};

export default PokemonEvolution;
