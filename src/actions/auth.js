import {
    SIGNUP_LOGIN_SUCCESS, LOGOUT_SUCCESS, NEW_EMAIL_CONFIRM_SUCCESS,
    EMAIL_CONFIRM_SUCCESS, EMAIL_CONFIRM_FAILED } from '../actionTypes';
import store from 'store';
import axios from 'axios';
import parseErrors from 'middleware/parseErrors';
import { SubmissionError } from 'redux-form';
import { API_URL } from '../constants/application';

export const signupLoginSuccess = user => ({
    type: SIGNUP_LOGIN_SUCCESS,
    user,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const newEmailConfirmSuccess = (user, deleteKey) => ({
    type: NEW_EMAIL_CONFIRM_SUCCESS,
    user,
    deleteKey,
});

export const emailConfirmSuccess = user => ({
    type: EMAIL_CONFIRM_SUCCESS,
    user,
});

export const emailConfirmFailed = error => ({
    type: EMAIL_CONFIRM_FAILED,
    error,
});

export const authenticate = values =>
    dispatch =>
        axios.post(`${API_URL}/auth`, values)
            .then(response => {
                const userData = response.data;
                store.set('token', `Bearer ${userData.data.token}`);
                store.set('user', userData.data.user);
                dispatch(signupLoginSuccess(userData.data.user));
            });

export const loginFetch = values =>
    dispatch =>
        dispatch(authenticate(values))
            .catch(err =>
             Promise.reject(parseErrors(err))
            );

export const logoutAction = cb =>
    (dispatch) => {
        store.remove('token');
        store.remove('user');
        dispatch(logoutSuccess());
        return typeof cb === 'function' && cb();
    };

export const createStudentUser = values =>
    dispatch =>
        axios.post(`${API_URL}/register/student`, values)
            .then(response => {
                const userData = { 'email': values.email, 'password': values.password };
                dispatch(loginFetch(userData));
            }).catch(err =>
                Promise.reject(parseErrors(err.response))
            );

export const createCompanyUser = values =>
    dispatch =>
        axios.post(`${API_URL}/register/company`, values)
            .then(response => {
                const userData = { 'email': values.email, 'password': values.password };
                dispatch(loginFetch(userData));
            }).catch(err =>
                Promise.reject(parseErrors(err.response))
            );

// export function forgotPasswordFetch(values) {
//     return () =>
//         fetch(`${API_URL}/resetPassword`, {
//             method: 'POST',
//             body: JSON.stringify(values),
//         }).catch(err =>
//             Promise.reject(parseErrors(err))
//             );
// }

// export function recoverPasswordFetch(token, password, callback) {
//     return () =>
//         fetch(`${API_URL}/recoverPassword/${token}`, {
//             method: 'POST',
//             body: JSON.stringify({ password }),
//         }).then(() => {
//             if (typeof callback === 'function') callback();
//         }).catch(err =>
//             Promise.reject(parseErrors(err))
//             );
// }

// export function emailConfirmFetch(values, callback) {
//     return dispatch =>
//         fetch(`${API_URL}/emailConfirm`, {
//             method: 'POST',
//             body: JSON.stringify(values),
//         }).then(() => {
//             const user = store.get('user');
//             if (user.newEmail) {
//                 user.email = user.newEmail;
//                 delete user.newEmail;
//                 dispatch(newEmailConfirmSuccess(user, 'newEmail'));
//             } else {
//                 user.confirmed = true;
//                 dispatch(emailConfirmSuccess(user));
//             }
//             store.set('user', user);
//             if (typeof callback === 'function') callback();
//         }).catch(err =>
//             dispatch(emailConfirmFailed(err.message))
//             );
// }

// export function emailResendFetch(values) {
//     return () =>
//         fetch(`${API_URL}/resendConfirmation`, {
//             method: 'POST',
//             body: JSON.stringify(values),
//         });
// }
