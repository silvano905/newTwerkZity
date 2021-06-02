import api from '../utils/api';
import { setAlert } from './alert'
import {useDispatch, useSelector} from "react-redux";
import {
    POST_ERROR, UPDATE_POST,
} from './types';
import {header} from "express-validator";

// Add insta
export const addPaymentIntent = formData => async dispatch => {
    console.log('payment intent')
    try {
        await api.post('/stripe/payment', formData);

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { err }
        });
    }
};


export const config = {
    // Initialize the payment form elements

    //TODO: Replace with your sandbox application ID
    applicationId: 'sandbox-sq0idb-Fy04-hX43Th-SIz-vMTC-g',
    inputClass: 'sq-input',
    autoBuild: false,
    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
    }],
    // Initialize the credit card placeholders
    cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
    },
    cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
    },
    expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
    },
    postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
    },
    // SqPaymentForm callback functions
    callbacks: {
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */

        cardNonceResponseReceived: function (errors, nonce, cardData) {
            // alert(`The generated nonce is:\n${nonce}`);

            api.post('/stripe/square', {nonce: nonce})
                .then(response => {
                    return response.data
                })
                .then(data =>{
                    return true
                })
                .catch(error => {
                    throw (error);
                });

        }

    }
}



