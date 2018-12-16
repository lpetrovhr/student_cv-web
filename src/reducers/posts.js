import { GET_POSTS, GET_POSTS_TYPES, GET_CATEGORIES } from '../actionTypes';
import { fromJS } from 'immutable';

function initialState () {
    return fromJS({
        posts: [],
        postTypes: [],
        postCategories: [],
    });    
};

export default (state = initialState(), action) => {
    const { postsData, postTypeData, postCategoriesData } = action;
    switch (action.type) {
        case GET_POSTS:
            return state
                .set('posts', fromJS(postsData));
        case GET_POSTS_TYPES:
            return state
                .set('postTypes', fromJS(postTypeData));
        case GET_CATEGORIES:
            return state
                .set('postCategories', fromJS(postCategoriesData));
        default:
            return state;
    }
}