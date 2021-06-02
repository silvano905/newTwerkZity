import api from '../utils/api';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_USER,
    UPDATE_USER_PAID,
    POST_ERROR} from './types';

// Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await api.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Load User
export const checkUserPaid = () => async dispatch => {
    try {
        const res = await api.get('/users/updated');
        dispatch(setAlert('Payment was completed', 'success'));
        console.log(res.data)

        dispatch({
            type: UPDATE_USER_PAID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// edit user info
export const editUser = (id, formData) => async dispatch => {
    api.put('/users/'+ id,formData)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch(setAlert('Account info updated', 'success'));
            dispatch({
                type: UPDATE_USER,
                payload: data
            })
        })
        .catch(error => {
            throw (error);
        });
};

// edit user info
export const setPaidUser = (id, days) => async dispatch => {
    api.put('/users/paid/'+ id, days)
        .then(response => {
            return response.data
        })
        .then(data => {
            dispatch(setAlert('Account info updated', 'success'));
            dispatch({
                type: UPDATE_USER,
                payload: data
            })
        })
        .catch(error => {
            throw (error);
        });
};

// Register User
export const register = formData => async dispatch => {
    try {
        const res = await api.post('/users', formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        //if user was not created display an alert to the user
        if (errors) {
            dispatch(setAlert(errors, 'warning'));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const body = { email, password };

    try {
        const res = await api.post('/auth', body);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            dispatch(setAlert('Clave incorrecta', 'warning'));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout user
export const logout = () => async dispatch => {
    try {
        await api.get('/auth/logout');

        dispatch({
            type: LOGOUT,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const resetPassword = formData => async dispatch => {
    try {
        await api.post('/users/reset/request', formData);

        dispatch(setAlert('Se le envió un correo electrónico con instrucciones sobre cómo crear una contraseña nueva.', 'success'));


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const resetPasswordPatch = formData => async dispatch => {
    try {
        await api.patch('/users/reset/patch', formData);

        dispatch(setAlert('Nueva clave fue creada para tu cuenta', 'success'));


    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
