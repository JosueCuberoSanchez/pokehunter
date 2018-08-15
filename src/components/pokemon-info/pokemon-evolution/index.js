import React from 'react'

const PokemonEvolution = ({evolution}) => {
    return (
        <div className='mb-5'>
            <p className='mb-0'><strong>{evolution.name}</strong></p>
            <img src={evolution.sprite} alt="Pokemon logo" className='d-block mx-auto' />
            <p>{evolution.trigger}</p>
        </div>
    )
};

export default PokemonEvolution;