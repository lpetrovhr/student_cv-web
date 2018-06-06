import { GET_COMPANIES } from '../actionTypes';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return action.data;
    default:
      return state;
  }
}