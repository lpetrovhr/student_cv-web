import { GET_COMPANIES } from '../actionTypes';
import api from 'middleware/fetch';
import store from 'store';

export const companySuccess = data => ({
  type: GET_COMPANIES,
  data
});

export const fetchCompanies = () =>
  dispatch =>
    api.get('http://localhost:3000/companies')
      .then(data => {
        dispatch(companySuccess(data));
      });

export const fetchSingleCompany = (id) =>
      dispatch =>
        api.get(`http://localhost:3000/companies/${id}`)
          .then(data => {
            dispatch(companySuccess(data));
          });