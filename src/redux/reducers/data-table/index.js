import * as a from '../../actions/types';

const INITIAL_STATE = {
    isLoading: false,
    game: '',
    error: '',
    pokemons: []
};

function DataTableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_DATA_TABLE_REQUEST:
            return { ...state, isLoading: true }; // all that I already had but change game to action.payload and return a new object
        case a.GET_DATA_TABLE_SUCCESS:
            return { ...state, pokemons: action.payload.pokemons, game: action.payload.game, isLoading: false }; // all that I already had but change game to action.payload and return a new object
        case a.GET_DATA_TABLE_FAILURE:
            return { ...state, error: action.error, isLoading: false }; // all that I already had but change game to action.payload and return a new object
        default:
            return state;
    }
}

export default DataTableReducer;
