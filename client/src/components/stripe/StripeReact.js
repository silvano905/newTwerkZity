import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './Checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51H4G4xB9GffACqxkTUkP9dsSwvCH5UbEKBPhQkxvngpJZjERzWymnLpIfOxvyiq3LdIXTRzULJVNYmW9SQVhXvTI00RZ0E91sN");




const StripeReact = (props) => {

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm history={props.history}/>
        </Elements>
    );
}


export default StripeReact;