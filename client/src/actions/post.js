import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_POSTS,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    GET_TOP_POSTS,
    GET_FREE,
    GET_PREMIUM,
    GET_FAVORITES,
    UPDATE_VIEWS
} from './types';
import {header} from "express-validator";

// Get all post
export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/post');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all post
export const getTopPosts = () => async dispatch => {
    try {
        const res = await api.get('/post/top');
        dispatch({
            type: GET_TOP_POSTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all post
export const getPremium = () => async dispatch => {
    try {
        const res = await api.get('/post/premium');
        dispatch({
            type: GET_PREMIUM,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all post
export const getFree = () => async dispatch => {
    try {
        const res = await api.get('/post/free');
        dispatch({
            type: GET_FREE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Delete post
export const deletePost = id => async dispatch => {
    try {
        await api.delete(`/post/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post deleted', 'warning'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Add post
export const addPost = formData => async dispatch => {
    // we are passing headers to our post api with multipart/form-data because we are sending a file
    try {
        const res = await api.post('/post', formData, {    headers: {
                'Content-Type': 'multipart/form-data'
            }});

        dispatch({
            type: CREATE_POST,
            payload: res.data
        });
        dispatch(setAlert('Nombre fue agregado', 'success'));


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { err }
        });
        dispatch(setAlert('Necesita crear una cuenta', 'warning'));

    }
};

// Add insta
export const addInsta = formData => async dispatch => {

    // we are passing headers to our post api with multipart/form-data because we are sending a file
    try {
        const res = await api.post('/insta', formData);

        dispatch(setAlert('Error, intenta sin Instagram', 'warning'));


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { err }
        });
    }
};

// Add insta
export const addInstaTwo = formData => async dispatch => {

    // we are passing headers to our post api with multipart/form-data because we are sending a file
    try {
        const res = await api.post('/insta', formData);


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { err }
        });
    }
};


// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await api.get(`/post/byId/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get post
export const getFavorites = user_id => async dispatch => {
    try {
        const res = await api.get(`/post/${user_id}`);
        dispatch({
            type: GET_FAVORITES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// edit post
export const editPost = (id, formData) => async dispatch => {

    // using .then after api sends data back is another way of handling the response from the server
    // we could also use a try & catch to handle the response from the server like we did with the getPost above
    api.put('/post/update/'+ id,formData)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch(setAlert('Post updated', 'success'));
            dispatch({
                type: UPDATE_POST,
                payload: data
            })
        })
        .catch(error => {
            throw (error);
        });
};


// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await api.put(`/post/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add views
export const addViewsNumber = id => async dispatch => {
    try {
        const res = await api.put(`/post/add/${id}`);
        dispatch({
            type: UPDATE_VIEWS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await api.put(`/post/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


