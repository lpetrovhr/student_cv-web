import { GET_CATEGORIES, GET_SOCIAL, GET_TAGS } from '../actionTypes';
import store from 'store';
import axios from 'axios';
import parseErrors from 'middleware/parseErrors';
import { SubmissionError } from 'redux-form';
import { API_URL } from '../constants/application';

export const fetchCategoriesSuccess = data => ({
    type: GET_CATEGORIES,
    categories: data,
});

export const fetchSocialSuccess = data => ({
    type: GET_SOCIAL,
    social: data,
});

export const fetchTagsSuccess = data => ({
    type: GET_TAGS,
    tags: data,
});

export const fetchCategories = () =>
    dispatch =>
        axios.get(`${API_URL}/categories`)
            .then(response => {
                dispatch(fetchCategoriesSuccess(response.data));
            });

export const fetchSocial = () =>
    dispatch =>
        axios.get(`${API_URL}/social`)
            .then(response => {
                dispatch(fetchSocialSuccess(response.data));
            });

export const fetchTags = () =>
    dispatch =>
        axios.get(`${API_URL}/categories/tags`)
            .then(response => {
                dispatch(fetchTagsSuccess(response.data));
            });