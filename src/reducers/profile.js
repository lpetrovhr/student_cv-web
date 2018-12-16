import { USER_FETCH_SUCCESS } from '../actionTypes';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({});
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case USER_FETCH_SUCCESS:
            return state
                .merge(fromJS(action.data));
        default:
            return state;
    }
}