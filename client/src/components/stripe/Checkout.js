import React, {Fragment, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import {setAlert} from "../../actions/alert";


import CardSection from './CardSection';
import api from "../../utils/api";



// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        background: '#07123e',
        boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
        borderRadius: 3,
        border: 0,
        margin: '5px 0 5px 0'
    },
    button: {
        background: 'white',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
        margin: 10
    },
    gradient: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 40,
        padding: '0 5px',
        margin: 2
    },
    normalButton: {
        background: 'linear-gradient(45deg, #001845 30%, #003554 90%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: 40,
        padding: '0 5px',
        margin: 2
    },
    border: {
        background: 'linear-gradient(45deg, #004e64 30%, #25a18e 90%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        padding: '0 5px',
        margin: 3
    },
    margin: {
        margin: 3
    }
}));

//end material ui

export default function CheckoutForm(props) {

    //material ui
    const classes = useStyles();

    const {user} = useSelector(state => state.auth);



    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        key: ''
    });


    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }



        await api('/stripe/secret/'+ user._id)
            .then(response => {
            return response.data;
        }).then(responseJson => {
            let clientSecret = responseJson.client_secret;
            setFormData({...formData,key: formData.key = clientSecret})
            // Call stripe.confirmCardPayment() with the client secret.
        });


        const result = await stripe.confirmCardPayment(formData.key, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                dispatch(setAlert('Paid', 'success'));
                props.history.push('/')
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }




    };

    return (
            <Fragment>
                <div style={{flexFlow: 1}}>
                    <Grid container spacing={0}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={11} sm={11} lg={5}>
                                <Paper className={classes.paper}>
                                    <form onSubmit={handleSubmit}>
                                        <CardSection />
                                        <button className={classes.button} disabled={!stripe}>Confirm</button>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
    );

}