import * as a from '../../actions/types';

const INITIAL_STATE = {
    frontDefault:'',
    backDefault:'',
    frontShiny:'',
    backShiny:''
};

function PokemonSpritesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_SPRITES_REQUEST:
            //console.log('get req');
            return { ...state,
                frontDefault: action.payload.frontShiny,
                backDefault: action.payload.backDefault,
                frontShiny: action.payload.frontShiny,
                backShiny: action.payload.backShiny,
            };
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
