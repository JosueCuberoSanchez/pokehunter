import * as a from '../../actions/types';

const INITIAL_STATE = {
    baseExperience:'',
    baseHappiness:'',
    habitat:''
};

function PokemonAsideReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_POKEMON_REQUEST:
            //console.log('get req');
            return true;
        case a.GET_POKEMON_SUCCESS:
            //console.log('get succ');
            return true;
        case a.GET_POKEMON_FAILURE:
            //console.log('get fail');
            return true;
        default:
            //console.log('def aside');
            return state;
    }
}

export default PokemonAsideReducer;
