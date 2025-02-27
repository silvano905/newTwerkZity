import { v4 as uuidv4 } from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from "./types";

export const setAlert = (msg, alertType) => dispatch => {
    //create a universal random id
    //that id will be used later to delete the alert
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    });

    //the alert will be deleted automatically in 5 seconds
    setTimeout(()=>dispatch({type: REMOVE_ALERT, payload: id}),5000);
};
