import * as a from '../../actions/types';

const INITIAL_STATE = {
    name:'',
    number:'',
    height:'',
    weight:'',
    types:[],
    generation:'',
    description:'',
    locations: ''
};

function PokemonBasicReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_POKEMON_BASIC_REQUEST:
            //console.log('get req');
            return { ...state,
                name: action.payload.name,
                number: action.payload.number,
                height: action.payload.height,
                weight: action.payload.weight,
                types: action.payload.types,
                generation: action.payload.generation,
                description: action.payload.description,
                locations: action.payload.locations
            };
        case a.GET_POKEMON_BASIC_SUCCESS:
            //console.log('get succ');
            return true;
        case a.GET_POKEMON_BASIC_FAILURE:
            //console.log('get fail');
            return true;
        default:
            //console.log('def basic');
            return state;
    }
}

export default PokemonBasicReducer;
