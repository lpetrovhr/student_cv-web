import {
    USER_FETCH_SUCCESS
} from '../actionTypes';
import api from 'middleware/fetch';
import store from 'store';
import axios from 'axios';
import parseErrors from 'middleware/parseErrors';
import { SubmissionError } from 'redux-form';
import { API_URL } from '../constants/application';

export const profileFetchSuccess = data => ({
    type: USER_FETCH_SUCCESS,
    data,
});

export const getCurrentProfile = id =>
    dispatch =>
        axios.get(`${API_URL}/user/${id}`)
            .then(response => 
                dispatch(profileFetchSuccess(response.data))
            );

export const updateStudentById = (values, id) =>
    dispatch =>
        axios.put(`${API_URL}/students/${id}`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.student = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const updateCompanyById = (values, id) =>
    dispatch =>
        axios.put(`${API_URL}/companies/${id}`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.company = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const updateSocialCategories = (id, values) =>
    dispatch =>
        axios.put(`${API_URL}/user/${id}/social`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.student = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const addSocialCategories = (id, values) =>
    dispatch =>
        axios.put(`${API_URL}/companies/${id}`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.student = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const updateUserImage = (id, values) =>
    dispatch =>
        axios.post(`${API_URL}/user/${id}/upload/image`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.student = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const updateUserCv = (id, values) =>
    dispatch =>
        axios.post(`${API_URL}/user/${id}/upload/cv`, values)
            .then(response => {
                const currentUser = store.get('user');
                currentUser.student = response.data.data;
                store.set('user', currentUser);
                dispatch(profileFetchSuccess(currentUser));
            })
            .catch(err => Promise.reject(parseErrors(err)));

export const addUserTag = (userId, tagName) =>
    dispatch =>
        axios.post(`${API_URL}/user/${userId}/tag`, { tagName })
            .then()
            .catch(err => Promise.reject(parseErrors(err)));

export const removeUserTag = (userId, tagId) =>
    dispatch =>
        axios.delete(`${API_URL}/user/${userId}/tag/${tagId}/remove`)
            .then()
            .catch(err => Promise.reject(parseErrors(err)));