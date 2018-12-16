import { GET_COMPANIES } from '../actionTypes';
import { fromJS } from 'immutable';

function initialState() {
  return fromJS({
    companies: [],
  });
};

export default (state = initialState(), action) => {
  const { companiesData } = action;
  switch (action.type) {
    case GET_COMPANIES:
      return state
        .set('companies', fromJS(companiesData));
    default:
      return state;
  }
}