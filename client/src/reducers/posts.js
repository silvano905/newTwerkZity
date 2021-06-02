import {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    GET_POST,
    UPDATE_LIKES,
    GET_TOP_POSTS,
    GET_PREMIUM,
    GET_FREE,
    GET_FAVORITES,
    UPDATE_VIEWS
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loadingPosts: true,
    loadingSinglePost: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loadingPosts: false,
                loadingSinglePost: true
            };
        case GET_TOP_POSTS:
            return {
                ...state,
                posts: payload,
                loadingPosts: false,
                loadingSinglePost: true
            };
        case GET_FAVORITES:
            return {
                ...state,
                posts: payload,
                loadingPosts: false,
                loadingSinglePost: true
            };
        case GET_PREMIUM:
            return {
                ...state,
                posts: payload,
                loadingPosts: false,
                loadingSinglePost: true
            };
        case GET_FREE:
            return {
                ...state,
                posts: payload,
                loadingPosts: false,
                loadingSinglePost: true
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loadingSinglePost: false
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loadingPosts: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(allPosts => allPosts._id !== payload),
                loadingPosts: false
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(allPosts => allPosts._id === payload._id ?
                    { ...allPosts, text: payload.text } :
                    allPosts
                ),
                loadingPosts: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                post: payload.likes,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes.likes } : post
                ),
                loadingSinglePost: false
            };
        case UPDATE_VIEWS:
            return {
                ...state,
                post: payload,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, views: payload.views } : post
                ),
                loadingSinglePost: false
            };
        default:
            return state;
    }
}