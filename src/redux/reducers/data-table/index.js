import * as a from '../../actions/types';

const INITIAL_STATE = {
    game: ''
};

function DataTableReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case a.GET_DATA_TABLE_REQUEST:
            //console.log('get req');
            return { ...state, game: action.payload };
        case a.GET_DATA_TABLE_SUCCESS:
            //console.log('get succ');
            return true;
        case a.GET_DATA_TABLE_FAILURE:
            //console.log('get fail');
            return true;
        default:
            //console.log('def aside');
            return state;
    }
}

export default DataTableReducer;
