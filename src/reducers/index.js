import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import students from './students';
import companies from './companies';

const appReducer = {
    form,
    students,
    companies
};

export default appReducer;
