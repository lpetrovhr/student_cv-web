import { GET_STUDENTS } from '../actionTypes';
import api from 'middleware/fetch';
import store from 'store';

export const studentSuccess = data => ({
    type: GET_STUDENTS,
    data
});

export const fetchStudents = () =>
  dispatch =>
    api.get('http://localhost:3000/students')
      .then(data => {
        dispatch(studentSuccess(data));
      });

export const fetchSingleStudent = (id) =>
      dispatch =>
        api.get(`http://localhost:3000/students/${id}`)
          .then(data => {
            dispatch(studentSuccess(data));
          });