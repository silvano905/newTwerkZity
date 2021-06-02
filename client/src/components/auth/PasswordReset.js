import React, {Fragment, useState} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import {resetPassword} from "../../actions/auth";

// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '10px 0 0 0'
    },
    login: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#22223b',
        background: '#e9ecef',
        borderRadius: 3,
        border: 0,
        margin: 10
    },
}));

//end material ui

const PasswordReset = () => {

    const {isAuthenticated} = useSelector(state => state.auth);

    const dispatch = useDispatch()



    //name of state and function to change state
    const [formData, setFormData] = useState({
        email: '',
    });


    //material ui
    const classes = useStyles();

    const { email} = formData;

    //make a copy of the current state, get the name from input name = input value
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(resetPassword({email}))
    }

    //redirect if logged in
    if(isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <Fragment>


            <div className={classes.root}>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid item sm={11} lg={7} xs={11}>
                        <Paper elevation={3} className={classes.paper}>
                            {/*<Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>*/}
                            {/*    Request a new password*/}
                            {/*</Typography>*/}

                            {/*<Typography  variant="subtitle1" gutterBottom className={classes.login}>*/}
                            {/*    Enter your email to send you the instructions on how to reset your password.*/}
                            {/*</Typography>*/}
                            <Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Request a new password
                            </Typography>

                            <Typography  variant="subtitle1" gutterBottom className={classes.login}>
                                Enter your email to send you the instructions on how to reset your password.
                            </Typography>


                            <form onSubmit={e => onSubmit(e)} style={{marginTop: 10}}>

                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                    <Grid item sm={9} lg={8} xs={9}>
                                        <TextField
                                            style={{margin: '10px auto 10px auto'}}
                                            variant="outlined"
                                            id="standard-basic"
                                            label="Email"
                                            name="email"
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item sm={9} lg={8} xs={9}>
                                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">Send</Button>
                                    </Grid>

                                </Grid>

                                {/*<Grid container spacing={0} direction="row" justify="center" alignItems="center">*/}
                                {/*    <Grid item sm={9} lg={8} xs={9}>*/}
                                {/*        <TextField*/}
                                {/*            style={{width: '36ch', margin: 10}}*/}
                                {/*            variant="outlined"*/}
                                {/*            id="standard-basic"*/}
                                {/*            label="Email"*/}
                                {/*            name="email"*/}
                                {/*            onChange={e => onChange(e)}*/}
                                {/*            required*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item sm={9} lg={8} xs={9}>*/}
                                {/*        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">Send</Button>*/}
                                {/*    </Grid>*/}

                                {/*</Grid>*/}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        </Fragment>
    )
}


export default PasswordReset;