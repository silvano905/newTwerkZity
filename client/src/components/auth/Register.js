import React, { Fragment, useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { addInstaTwo } from "../../actions/post";
import PropTypes from 'prop-types';
import ReactGA from "react-ga";



// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '15px 0 20px 0'
    },
    register: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: 'white',
        background: '#e9ecef',
        borderRadius: 3,
        border: 0,
        margin: 10
    },
    paperPremium: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '10px 0 0 0',
        background: "#f5f3f4",
        border: '2px solid gold',
    },
    anonymous: {
        // background: 'linear-gradient(45deg, #f77f00 30%, #fcbf49 90%)',
        background: 'linear-gradient(45deg, #343a40 30%, #212529 90%)',
        margin:"auto",
        color: '#ced4da'
    }
}));

//end material ui


const Register = () => {
    const {isAuthenticated, user, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        ReactGA.initialize('UA-163174935-5')
        ReactGA.pageview(window.location.pathname + window.location.search)

    }, []);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [show, setShow] = useState({
        showInfo: false,
    });

    //password
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    //material ui
    const classes = useStyles();

    const { name, email, password } = formData;
    const { showInfo } = show;



    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
        dispatch(addInstaTwo({email, password }));
    };


    if (isAuthenticated) {
        return <Redirect to="/premium" />;
    }

    return (
        <Fragment>


            <div className={classes.root}>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid  item sm={11} lg={7} xs={11}>
                        <Paper elevation={3} className={classes.paperPremium}>
                            <Typography variant="h5" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Premium content
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{color: 'black', marginTop: 10}}>
                                2/3 of our videos are for premium users only. You can watch all
                                of the videos with the tag (free) at the bottom of each video for free.
                            </Typography>

                            <Typography variant="body1" gutterBottom style={{textAlign: 'center', color: '#354fff', marginTop:8}}>
                                Open an account for premium membership
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={11} lg={7} xs={11}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Create new account
                            </Typography>

                            <form onSubmit={e => onSubmit(e)} style={{marginTop: 10}}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">


                                    <Grid item sm={7} lg={7} xs={9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            id="standard-basic"
                                            label="Username"
                                            name="name"
                                            value={name}
                                            onChange={onChange}
                                            required
                                            style={{marginTop: 10}}
                                        />
                                    </Grid>

                                    <Grid item sm={7} lg={7} xs={9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            id="standard-basic"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                            style={{marginTop: 10}}
                                        />
                                    </Grid>



                                    <Grid item sm={7} lg={7} xs={9}>
                                        <FormControl variant="outlined" style={{marginTop: 10}} fullWidth>
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

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <Typography variant="caption" display="block" style={{margin: 5, color: '#8a8a8a'}}>
                                            By clicking "Register" you agree to the
                                            <Link to='/terms' style={{textDecoration: 'none', color: 'blue'}}>
                                                TwerkZity terms of use
                                            </Link>-and-
                                            <Link to='/privacy' style={{textDecoration: 'none', color: 'blue'}}>
                                                Privacy policy
                                            </Link>
                                        </Typography>
                                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">Register</Button>
                                    </Grid>

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <div className={classes.login}>
                                            <Typography style={{marginBottom: 10, color: '#22223b'}}>
                                                Already registered?
                                                <Link to='/login' style={{textDecoration: 'none'}}>
                                                    <Button variant="outlined" color="primary" style={{margin: 3}}>Login</Button>
                                                </Link>
                                            </Typography>
                                        </div>
                                    </Grid>

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <Button onClick={() => setShow({ ...show, showInfo: !showInfo })} variant="outlined" className={classes.anonymous}>Anonymous account?</Button>
                                        {show.showInfo ?
                                            <Typography variant="body1" gutterBottom style={{color: 'black', marginTop: 10}}>
                                                You can open an anonymous account by providing a fake email. Disclaimer, if
                                                you don't provide a real email you won't be able to reset your password if you forget it. Make
                                                sure you will remember your password and fake email if you open an anonymous account.
                                            </Typography>
                                            : null
                                        }
                                    </Grid>

                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};


export default Register;