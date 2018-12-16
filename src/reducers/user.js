import { fromJS } from 'immutable';
import {
    SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, NEW_EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_SUCCESS, PROFILE_UPDATE_SUCCESS, ALL_USERS_FETCH_SUCCESS
} from '../actionTypes';

function initialState () {
    return fromJS({
        user: []
    });
};

export default (state = initialState(), action) => {
    switch (action.type) {
        case SIGNUP_LOGIN_SUCCESS:
        case EMAIL_CONFIRM_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
        case ALL_USERS_FETCH_SUCCESS:
            return state.set('user', fromJS(action.data));
        case NEW_EMAIL_CONFIRM_SUCCESS:
            return state.set('user', fromJS(action.data)).delete(action.deleteKey);
        case LOGOUT_SUCCESS:
            return initialState();
        default:
            return state;
    }
};
