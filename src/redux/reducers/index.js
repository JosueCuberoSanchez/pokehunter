import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import PokemonBasicReducer from './pokemon-basic-info';
import PokemonAsideReducer from './pokemon-aside-info';
import PokemonSpritesReducer from './sprites';
import DataTableReducer from './data-table';
import EvolutionChainReducer from './evolution-chain';

export default combineReducers({
    pokemonBasic: PokemonBasicReducer,
    pokemonAside: PokemonAsideReducer,
    sprites: PokemonSpritesReducer,
    dataTable: DataTableReducer,
    evolutionChain: EvolutionChainReducer,
    router: routerReducer
})
