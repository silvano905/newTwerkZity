import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
// import config from './paymentForm';
import {config} from "../../actions/payment";
import {makeStyles} from "@material-ui/core/styles";
import StripeReact from "../stripe/StripeReact";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {checkUserPaid, loadUser} from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginTop:12
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        background: 'linear-gradient(45deg, #27fb6b 30%, #2ceaa3 90%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        padding: '0 20px',
        margin: 5,
        textAlign: 'center'
    },
    border: {
        background: 'black',
        border: 0,
        borderRadius: 3,
        color: '#f7fff7',
        padding: '0 5px',
        margin: 3,
        textAlign: 'center'
    },
    margin: {
        margin: 3
    },
    cart:{
        textAlign: 'center',
        width: 115,
        background:'#b5b7b7',
        borderRadius: 8,
        margin: "auto",
        color: 'white',
        marginBottom: 5
    },
    paperNoBgTwo: {
        border: 0,
        borderRadius: 10,
        padding: '5px 5px',
        margin: 8,
        textAlign: 'center',
        color: '#faf9f9',
        background: 'linear-gradient(45deg, #01497c 30%, #012a4a 90%)',
    },
    textColor: {
        color: '#4f4f4f',
        textAlign: 'center'
    }
}));

//end material ui

const Square = ({ paymentForm, price }) => {
    //material ui
    const classes = useStyles();

    const dispatch = useDispatch()

    paymentForm = new paymentForm(config);
    paymentForm.build();
    function myFunction() {
        dispatch(checkUserPaid())
    }
    const requestCardNonce = () =>{
        paymentForm.requestCardNonce();
        setTimeout(myFunction, 3000)

    }



    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={11} lg={8} xs={11}>
                <Paper elevation={2} className={classes.paper}>
                    <Typography variant="h5" gutterBottom className={classes.textColor}>
                        Pay with Square
                    </Typography>
                    <div id="sq-card-number"></div>
                    <div className="third" id="sq-expiration-date"></div>
                    <div className="third" id="sq-cvv"></div>
                    <div className="third" id="sq-postal-code"></div>
                    <button id="sq-creditcard" className="button-credit-card" onClick={requestCardNonce}> Pay $ {price}</button>
                </Paper>
            </Grid>
        </Grid>

    )
}

export default Square;