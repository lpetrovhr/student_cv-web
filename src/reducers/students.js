import { GET_STUDENTS } from '../actionTypes';
import { fromJS } from 'immutable';

function initialState () {
    return fromJS({
        students: [],
    });
};

export default (state = initialState(), action) => {
    const { studentsData } = action;
    switch (action.type) {
        case GET_STUDENTS:
            return state
                .set('students', fromJS(studentsData));
        default:
            return state;
    }
}