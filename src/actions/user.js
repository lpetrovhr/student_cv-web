import {
    ALL_USERS_FETCH_SUCCESS,
    USER_ACTIVATE_SUCCESS
} from '../actionTypes';
import api from 'middleware/fetch';
import store from 'store';
import axios from 'axios';
import parseErrors from 'middleware/parseErrors';
import { SubmissionError } from 'redux-form';
import { API_URL } from '../constants/application';

const headers = {
    'headers': {
        'Authorization': store.get('token')
    }
}

export const usersFetchSuccess = data => ({
    type: ALL_USERS_FETCH_SUCCESS,
    data,
});

export const userUpdateSuccess = () => ({
    type: USER_ACTIVATE_SUCCESS,
});

export const fetchAllUsers = () =>
    dispatch =>
        axios.get(__API_URL__, headers)
            .then(response =>{
                dispatch(usersFetchSuccess(response.data))}
            );

export const updateActiveState = (userId, status) =>
    dispatch =>
        axios.put(`${API_URL}/user/${userId}/activate`, { "status": status }, headers)
            .then(dispatch(userUpdateSuccess()))