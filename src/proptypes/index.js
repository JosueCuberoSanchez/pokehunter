// Proptypes for each sub model

import PropTypes from 'prop-types'

export const pokemonBasicInfo = PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    generation: PropTypes.string.isRequired,
    description: PropTypes.string,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    locations: PropTypes.string.isRequired,
    habitat: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired
});

export const pokemonBasicInfoDefault = {
    name: '',
    number: '',
    generation: '',
    description: '',
    weight: '',
    height: '',
    locations: '',
    habitat: '',
    types: ['','']
};

export const pokemonSprites = PropTypes.shape({
    frontDefault: PropTypes.string.isRequired,
    backDefault: PropTypes.string.isRequired,
    frontShiny: PropTypes.string.isRequired,
    backShiny: PropTypes.string.isRequired
});

export const pokemonSpritesDefault = {
    frontDefault: '',
    backDefault: '',
    frontShiny: '',
    backShiny: ''
};

export const pokemonAsideInfo = PropTypes.shape({
    baseExperience: PropTypes.number.isRequired,
    baseHappiness: PropTypes.number.isRequired
});

export const pokemonAsideInfoDefault = {
    baseExperience: '',
    baseHappiness: ''
};