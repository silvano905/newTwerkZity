import React, {Fragment, useEffect, useState, useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Spinner from "../layout/Spinner";



// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {setPaidUser} from "../../actions/auth";
import {setAlert} from "../../actions/alert";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        background: 'linear-gradient(45deg, #0077b6 30%, #012a4a 90%)',
        boxShadow: '0 3px 5px 2px rgba(11, 82, 91, .5)',
        borderRadius: 3,
        border: 0,
        margin: '5px 0 25px 0'
    }
}));


//end material ui


//paypal code

function Product({ product, props }) {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: product.price,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    const id = user._id
                    const days = props.days
                    dispatch(setPaidUser(id,{days: days}));
                    dispatch(setAlert('Payment was successful', 'success'));
                    props.history.push('/')
                },
                onError: err => {
                    dispatch(setAlert('Payment not accepted', 'warning'));
                    setError(err);
                },
            })
            .render(paypalRef.current);
    }, [product.description, product.price,dispatch]);

    // if (paidFor) {
    //     return (
    //         <div>
    //             <h1>Congrats, you just bought {product.name}!</h1>
    //         </div>
    //     );
    // }

    return (
        <div>
            {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <Typography variant="h6" component="h6">
                Pay securely with Paypal
            </Typography>
            <div ref={paypalRef} />
        </div>
    );
}

//end paypal code

const PaypalPayment = (props) => {
    const [price, setPrice] = useState({
        amount: 5,
    });

    //material ui
    const classes = useStyles();
    //end material ui

    const {isAuthenticated, user} = useSelector(state => state.auth);

    const dispatch = useDispatch()
    //paypal code

    const product = {
        price: price.amount,
        name: 'Formula 1 bet',
        description: 'racinghobbyist bet',
    };

    //end paypal code

    if (isAuthenticated) {


        return (

            <Fragment>
                <div style={{flexFlow: 1}}>
                    <Grid container spacing={0}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={11} sm={11} lg={5}>
                                <Paper className={classes.paper}>
                                    <Product product={product} props={props}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>

        );
    }else {
        return (
            <Spinner/>
        )
    }


}


export default PaypalPayment;