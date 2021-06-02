import React, {Fragment, useState} from "react";
import { Link, Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../../actions/auth';



// material ui imports for styling
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
        margin: '10px 0 20px 0'
    },
    login: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        background: '#f8f9fa',
        borderRadius: 3,
        border: 0,
        margin: 10
    },
}));

//end material ui

const Login = () => {

    //react hooks
    const {isAuthenticated, user, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    //to show or hide password
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    //material ui
    const classes = useStyles();
    //end

    const { email, password} = formData;

    //make a copy of the current state, get the name from input name = input value
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    //redirect if the user is logged in
    if(isAuthenticated) {
        return <Redirect to='/'/>
    }


    return (
        <Fragment>

            <div className={classes.root}>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid item sm={11} lg={7} xs={11}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Login to my account
                            </Typography>

                            <form onSubmit={e => onSubmit(e)} style={{marginTop: 10}}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">

                                    <Grid item sm={7} lg={7} xs={9}>
                                        <TextField
                                            variant="outlined"
                                            id="standard-basic"
                                            label="Email"
                                            name="email"
                                            onChange={e => onChange(e)}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item sm={7} lg={7} xs={9}>
                                        <FormControl variant="outlined" fullWidth style={{marginTop: 10}}>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                                            />
                                        </FormControl>
                                    </Grid>


                                    {/*<Grid item sm={9} lg={8} xs={9}>*/}
                                    {/*    <TextField*/}
                                    {/*        style={{width: '34ch', margin: 10,textAlign: 'center'}}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        id="standard-basic"*/}
                                    {/*        label="Email"*/}
                                    {/*        name="email"*/}
                                    {/*        onChange={e => onChange(e)}*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item sm={9} lg={8} xs={9}>*/}
                                    {/*    <FormControl variant="outlined" style={{margin: 10}}>*/}
                                    {/*        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>*/}
                                    {/*        <OutlinedInput*/}
                                    {/*            id="outlined-adornment-password"*/}
                                    {/*            label="Password"*/}
                                    {/*            type={values.showPassword ? 'text' : 'password'}*/}
                                    {/*            autoComplete="current-password"*/}
                                    {/*            name="password"*/}
                                    {/*            value={password}*/}
                                    {/*            onChange={onChange}*/}
                                    {/*            required*/}
                                    {/*            endAdornment={*/}
                                    {/*                <InputAdornment position="end">*/}
                                    {/*                    <IconButton*/}
                                    {/*                        aria-label="toggle password visibility"*/}
                                    {/*                        onClick={handleClickShowPassword}*/}
                                    {/*                    >*/}
                                    {/*                        {values.showPassword ? <Visibility /> : <VisibilityOff />}*/}
                                    {/*                    </IconButton>*/}
                                    {/*                </InputAdornment>*/}
                                    {/*            }*/}
                                    {/*        />*/}
                                    {/*    </FormControl>*/}
                                    {/*</Grid>*/}
                                    <Grid item sm={9} lg={8} xs={9}>
                                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">login</Button>
                                    </Grid>

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <div className={classes.login}>
                                            <Typography style={{marginBottom: 10, color: '#22223b'}}>
                                                Don't have an account?
                                                <Link to='/register' style={{textDecoration: 'none'}}>
                                                    <Button variant="outlined" color="primary" style={{margin: 3}}>Create account</Button>
                                                </Link>
                                            </Typography>
                                        </div>
                                    </Grid>

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <div className={classes.login}>
                                            <Typography style={{marginBottom: 10, color: '#22223b'}}>
                                                Forgot password?
                                                <Link to='/reset/request' style={{textDecoration: 'none'}}>
                                                    <Button size="small" variant="outlined" color="primary" style={{margin: 5}}>yes</Button>
                                                </Link>
                                            </Typography>
                                        </div>
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


export default Login;