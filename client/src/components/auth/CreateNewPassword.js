import React, {Fragment, useState} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import {resetPasswordPatch} from "../../actions/auth";




// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

const CreateNewPassword = (props) => {

    const {isAuthenticated} = useSelector(state => state.auth);

    const dispatch = useDispatch()



    //name of state and function to change state
    const [formData, setFormData] = useState({
        password: '',
    });


    //material ui
    const classes = useStyles();

    const {password} = formData;
    const uuid = props.match.params.id

    //make a copy of the current state, get the name from input name = input value
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(resetPasswordPatch({password, uuid}))
        props.history.push('/login')
    }

    //password
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

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
                            {/*    New password*/}
                            {/*</Typography>*/}

                            {/*<Typography  variant="subtitle1" gutterBottom className={classes.login}>*/}
                            {/*    Enter your new password*/}
                            {/*</Typography>*/}
                            <Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Nueva clave para tu cuenta
                            </Typography>

                            <Typography  variant="subtitle1" gutterBottom className={classes.login}>
                                Escriba tu nueva clave para tu cuenta
                            </Typography>


                            <form onSubmit={e => onSubmit(e)} style={{marginTop: 10}}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                    <Grid item sm={9} lg={8} xs={9}>
                                        <FormControl variant="outlined" style={{margin: 10}}>
                                            <InputLabel htmlFor="outlined-adornment-password">Clave</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                label="Password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                name="password"
                                                value={password}
                                                onChange={onChange}
                                                required
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={9} lg={8} xs={9}>
                                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">Enviar</Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        </Fragment>
    )
}


export default CreateNewPassword;