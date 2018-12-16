import { GET_COMPANIES } from '../actionTypes';
import store from 'store';
import axios from 'axios';
import { API_URL } from '../constants/application';

export const companySuccess = companiesData => ({
    type: GET_COMPANIES,
    companiesData
});

export const fetchCompanies = () =>
  dispatch =>
    axios.get(`${API_URL}/companies`)
      .then(response => {
        dispatch(companySuccess(response.data));
      });

export const fetchSingleCompany = (id) =>
      dispatch =>
        axios.get(`${API_URL}/companies/${id}`)
          .then(response => {
            dispatch(companySuccess(response.data));
          });