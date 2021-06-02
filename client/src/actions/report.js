import api from '../utils/api';
import { setAlert } from './alert';
import {
    POST_ERROR,
} from './types';
import {header} from "express-validator";


// Add insta
export const addReport = formData => async dispatch => {

    // we are passing headers to our post api with multipart/form-data because we are sending a file
    try {
        const res = await api.post('/report', formData);

        dispatch(setAlert('Success, we got your report.', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { err }
        });
    }
};

