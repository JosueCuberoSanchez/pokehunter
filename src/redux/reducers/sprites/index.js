import * as a from '../../actions';

const INITIAL_STATE = {
    pokemons: [],
    isLoading: false,
    error: '',
    game: ''
};

function PokemonSpritesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_SPRITES_REQUEST:
            //console.log('get req');
            return true;
        case a.GET_SPRITES_SUCCESS:
            //console.log('get succ');
            return true;
        case a.GET_SPRITES_FAILURE:
            //console.log('get fail');
            return true;
        default:
            //console.log('def sprites');
            return state;
    }
}

export default PokemonSpritesReducer;
