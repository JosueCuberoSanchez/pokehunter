import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import PokemonBasicReducer from './pokemon-basic-info';
import PokemonAsideReducer from './pokemon-aside-info';
import PokemonSpritesReducer from './sprites';

export default combineReducers({
    pokemonBasic: PokemonBasicReducer,
    pokemonAside: PokemonAsideReducer,
    sprites: PokemonSpritesReducer,
    router: routerReducer
})
