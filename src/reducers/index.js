import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import students from './students';
import companies from './companies';
import posts from './posts';
import user from './user';
import profile from './profile';
import categories from './categories';

const appReducer = combineReducers(fromJS({
    form,
    students,
    posts,
    companies,
    user,
    profile,
    categories
}));

export default appReducer;
