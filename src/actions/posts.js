import { GET_POSTS, GET_POSTS_TYPES, GET_CATEGORIES } from '../actionTypes';
import store from 'store';
import axios from 'axios';
import { API_URL } from '../constants/application';

export const postSuccess = data => ({
    type: GET_POSTS,
    postsData: data
});

export const postTypes = data => ({
    type: GET_POSTS_TYPES,
    postTypeData: data
});

export const postCategories = data => ({
    type: GET_CATEGORIES,
    postCategoriesData: data
});

export const fetchPosts = () =>
    dispatch =>
        axios.get(`${API_URL}/posts`)  
            .then(response => {
                dispatch(postSuccess(response.data));
            });

export const fetchPostsByType = (typeId) =>
    dispatch =>
        axios.get(`${API_URL}/posts/type/${typeId}`)
            .then(response => {
                dispatch(postSuccess(response.data));
            });

export const fetchSinglePost = id =>
    dispatch =>
        axios.get(`${API_URL}/posts/${id}`)
            .then(response => {
                dispatch(postSuccess(response.data));
            });

export const fetchPostTypes = () =>
            dispatch =>
                axios.get(`${API_URL}/posts/types`)
                    .then(response => {
                        dispatch(postTypes(response.data));
                    });

export const createNewPost = values =>
            dispatch =>
                    axios.post(`${API_URL}/posts`, values)
                        .then(response => {
                            dispatch(postSuccess(response.data));
                        });

export const updatePost = (id, values) =>
            dispatch =>
                    axios.put(`${API_URL}/posts/${id}`, values)
                        .then(response => {
                            dispatch(postSuccess(response.data));
                        });

export const fetchUserPosts = id =>
            dispatch =>
                axios.get(`${API_URL}/posts/user/${id}`)
                     .then(response => {
                        dispatch(postSuccess(response.data));
                     });

export const fetchPostCategories = () =>
            dispatch =>
                axios.get(`${API_URL}/categories`)
                     .then(response => {
                         dispatch(postCategories(response.data));
                     });