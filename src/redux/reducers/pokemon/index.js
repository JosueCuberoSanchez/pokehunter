import * as a from '../../actions/types';

const INITIAL_STATE = {
    isLoading: true,
    error: false,
    name:'',
    basicInfo: {},
    asideInfo: {},
    sprites: {},
    evolutionChain: {},
    game: '',
    previous: '',
    next: ''
};

const PokemonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case a.GET_POKEMON_REQUEST:
            return { ...state, isLoading: true }; // all that I already had but change game to action.payload and return a new object
        case a.GET_POKEMON_SUCCESS:
            return { ...state, name: action.payload.name, basicInfo: action.payload.basicInfo, asideInfo: action.payload.asideInfo,
                sprites: action.payload.sprites, evolutionChain: action.payload.evolutionChain, isLoading: false,
                game: action.payload.game, previous: action.payload.previous, next: action.payload.next };
            // all that I already had but change game to action.payload and return a new object
        case a.GET_POKEMON_FAILURE:
            return { ...state, error: true, isLoading: false }; // all that I already had but change game to action.payload and return a new object
        default:
            return state;
    }
};

export default PokemonReducer;
