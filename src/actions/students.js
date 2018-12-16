import { GET_STUDENTS } from '../actionTypes';
import store from 'store';
import axios from 'axios';
import parseErrors from 'middleware/parseErrors';
import { SubmissionError } from 'redux-form';
import { API_URL } from '../constants/application';

export const studentSuccess = studentsData => ({
    type: GET_STUDENTS,
    studentsData
});

export const fetchStudents = () =>
  dispatch =>
    axios.get(`${API_URL}/students`)
      .then(response => {
        dispatch(studentSuccess(response.data));
      });

export const fetchSingleStudent = (id) =>
      dispatch =>
        axios.get(`${API_URL}/students/${id}`)
          .then(response => {
            dispatch(studentSuccess(response.data));
          });

export const fetchStudenSearchResults = (name, tag, category) => 
      dispatch =>
          axios.get(`${API_URL}/students/search?name=${name}&tag=${tag}&category=${category}`)
            .then(response => {
              dispatch(studentSuccess(response.data));
            });