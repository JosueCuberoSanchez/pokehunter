import * as a from '../../actions/types';

const INITIAL_STATE = {
    first: {},
    second:[],
    third: [],
    game: ''
};

function EvolutionChainReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_EVOLUTION_CHAIN_REQUEST:
            //console.log('get req');
            return { ...state,
                first: action.payload.first,
                second: action.payload.second,
                third: action.payload.third,
                game: action.payload.game
            };
        case a.GET_EVOLUTION_CHAIN_SUCCESS:
            //console.log('get succ');
            return true;
        case a.GET_EVOLUTION_CHAIN_FAILURE:
            //console.log('get fail');
            return true;
        default:
            //console.log('def aside');
            return state;
    }
}

export default EvolutionChainReducer;
