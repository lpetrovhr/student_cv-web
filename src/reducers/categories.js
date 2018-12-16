import { GET_CATEGORIES, GET_SOCIAL, GET_TAGS } from '../actionTypes';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        categories: [],
        social: [],
        tags: [],
    });
};

export default (state = initialState(), action) => {
    const { categories, social, tags } = action;
    switch (action.type) {
        case GET_CATEGORIES:
            return state
                .set('categories', fromJS(categories));
        case GET_SOCIAL:
            return state
                .set('social', fromJS(social));
        case GET_TAGS:
            return state
                .set('tags', fromJS(tags));
        default:
            return state;
    }
}