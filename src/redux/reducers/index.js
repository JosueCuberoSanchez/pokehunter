import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import PokemonReducer from './pokemon/';
import DataTableReducer from './data-table/';

export default combineReducers({
    pokemon: PokemonReducer,
    dataTable: DataTableReducer,
    router: routerReducer
})
