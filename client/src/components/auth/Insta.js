import React, { Fragment, useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import {addInsta} from "../../actions/post";
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
        margin: '10px 0 0 0'
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
}));

//end material ui


const Insta = () => {
    const {isAuthenticated, user, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        ReactGA.initialize('UA-163174935-5')
        ReactGA.pageview(window.location.pathname + window.location.search)

    }, []);


    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(addInsta({email, password }));
    };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Fragment>

            <div className={classes.root}>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid item sm={11} lg={7} xs={11}>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" gutterBottom style={{color: 'black', marginTop: 10}}>
                                Crea una cuenta usando Instagram
                            </Typography>

                            <form onSubmit={e => onSubmit(e)}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                    <Grid item sm={5} lg={7} xs={9}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            id="standard-basic"
                                            label="Nombre de tu Instagram"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                            style={{marginTop: 10}}
                                        />
                                    </Grid>
                                    <Grid item sm={7} lg={7} xs={9}>
                                        <FormControl variant="outlined" style={{marginTop: 10}} fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-password">Clave de tu Instagram</InputLabel>
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
                                        <Button style={{margin: 10}} type="submit" variant="contained" color="primary">Registrarme</Button>
                                    </Grid>

                                    <Grid item sm={9} lg={8} xs={9}>
                                        <div className={classes.login}>
                                            <Typography style={{marginBottom: 10, color: '#22223b'}}>
                                                <Link to='/register' style={{textDecoration: 'none'}}>
                                                    <Button variant="outlined" color="primary" style={{margin: 3}}>Crear sin Instagram</Button>
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
    );
};


export default Insta;