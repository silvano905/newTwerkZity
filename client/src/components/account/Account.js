import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import {editUser} from "../../actions/auth";
import Moment from 'react-moment';


// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    filter: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '12px 8px 7px'
    },
    cart:{
        textAlign: 'center',
        width: 125,
        background:'#b5b7b7',
        borderRadius: 8,
        margin: "auto",
        color: 'white',
        marginBottom: 5
    }
}));

//end material ui

const Account = () => {


    //material ui
    const classes = useStyles();

    const {isAuthenticated, user, loading} = useSelector(state => state.auth);

    const dispatch = useDispatch()


    const [formData, setFormData] = useState({
        show: false,
        showInfo: true,
        id:'',
        name: null,
        email: null,
        phone: null
    });

    useEffect(() => {
        if(!loading && isAuthenticated){
            setFormData({...formData, name: user.name, email: user.email, id: user._id, phone: user.phone})
        }

    }, [loading,]);

    const id = formData.id
    const {show, showInfo} = formData
    const {email, name} = formData

    const payReady = async (e) => {
        e.preventDefault();
        dispatch(editUser(id, formData));
        // history.push('/')
    };

    if (isAuthenticated) {

        return (
            <Fragment>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Paper elevation={3} className={classes.filter}>
                        <Grid container spacing={0} style={{margin: 5}}>
                            <Grid item sm={12} lg={12} xs={12}>
                                <Typography variant="h5" gutterBottom className={classes.cart}>
                                    Account
                                </Typography>
                            </Grid>
                            {showInfo?
                                <Fragment>
                                    <Grid item sm={12} lg={12} xs={12}>
                                        <Typography variant="h6" component="h5">
                                            Name: {user.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} lg={12} xs={12}>
                                        <Typography variant="h6" component="h5">
                                            Email: {user.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} lg={12} xs={12}>
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            Full access expires: <Moment format="MMM D YYYY" withTitle>{user.subscription}</Moment>
                                        </Typography>
                                    </Grid>
                                </Fragment>
                                :null}
                            <Button onClick={() => setFormData({ ...formData, show: !show, showInfo: !showInfo })} variant="outlined" style={{margin: 'auto'}}>Edit</Button>
                        </Grid>
                    </Paper>
                </Grid>



                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    {formData.show ?
                        <form onSubmit={payReady} style={{textAlign: 'center'}}>

                            <div style={{flexFlow: 1}}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                    <Grid item sm={12} lg={12} xs={10}>
                                        <TextField
                                            label="Name"
                                            name='name'
                                            value={name}
                                            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            required
                                            fullWidth
                                            style={{ margin: 8 }}
                                        />
                                    </Grid>
                                    <Grid item sm={12} lg={12} xs={10}>
                                        <TextField
                                            label="Email"
                                            name='email'
                                            value={email}
                                            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                            required
                                            fullWidth
                                            style={{ margin: 8 }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>

                            <Button style={{margin: '20px 0 10px'}} type='submit' variant="contained" color="primary">
                                Done
                            </Button>
                        </form>
                        : null}
                </Grid>

            </Fragment>
        );
    }else {
        return (
            <Spinner/>

        )
    }
};

export default Account;