import React, {Fragment, useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import MainSquare from "../squarePayment/MainSquare";
import Spinner from "../layout/Spinner";
import PaypalPayment from "../payment/Paypal";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import StripeReact from "../stripe/StripeReact";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CompletedSteps from "./CompletedSteps";
import Chip from "@material-ui/core/Chip";
import {addPaymentIntent} from "../../actions/payment";
import {getPosts} from "../../actions/post";
import {checkUserPaid, loadUser} from "../../actions/auth";
import {Redirect} from "react-router-dom";

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
        color: '#242424'
    }
}));

//end material ui


const Pay = (props) => {
    //material ui
    const classes = useStyles();
    const {user, isAuthenticated} = useSelector(state => state.auth);

    const dispatch = useDispatch()

    if(isAuthenticated) {
        if (user.paid) {
            return <Redirect to="/member" />;
        }

        return (
            <Fragment>
                {/*<CompletedSteps num={1}/>*/}

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item sm={11} lg={8} xs={11}>
                    <Paper elevation={2} className={classes.paper}>
                        <Typography variant="h5" gutterBottom className={classes.textColor}>
                            Order summary
                        </Typography>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom className={classes.textColor}>
                                    Item
                                </Typography>
                            </Grid>
                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom>
                                    {props.location.state.months}-month access
                                </Typography>
                            </Grid>

                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom className={classes.textColor}>
                                    User
                                </Typography>
                            </Grid>
                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom>
                                    {user.name}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom className={classes.textColor}>
                                    Total
                                </Typography>
                            </Grid>
                            <Grid item sm={6} lg={6} xs={6}>
                                <Typography variant="h6" gutterBottom>
                                    ${props.location.state.price}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Grid>


                    {/*<Grid item sm={11} lg={8} xs={11}>*/}
                    {/*    <Paper elevation={2} className={classes.paper}>*/}
                    {/*        <Typography variant="h6" gutterBottom style={{textAlign: 'center', color: '#131313'}}>*/}
                    {/*            Pay with Square*/}
                    {/*        </Typography>*/}
                    {/*        <Typography variant="body1" gutterBottom style={{color: '#8a8a8a'}}>*/}
                    {/*            You will be taken to square.com to complete the payment*/}
                    {/*        </Typography>*/}
                    {/*        <Button variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*                href="https://checkout.square.site/merchant/NNFS62P1C1V8M/checkout/4KTBKIEDOITF2RIYS645CH4I?src=embed"*/}
                    {/*                className={classes.button}*/}
                    {/*        >*/}
                    {/*            pay using square*/}
                    {/*        </Button>*/}
                    {/*    </Paper>*/}
                    {/*</Grid>*/}

                </Grid>

                <MainSquare price={props.location.state.price}/>
                {/*<StripeReact history={props.history}/>*/}
                {/*<PaypalPayment history={props.history} days={props.location.state.days}/>*/}
            </Fragment>
        );
    }else {
        return (
            <Spinner/>
        )
    }


}

export default Pay;


