import { GET_STUDENTS } from '../actionTypes';

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.data;
        default:
            return state;
    }
}