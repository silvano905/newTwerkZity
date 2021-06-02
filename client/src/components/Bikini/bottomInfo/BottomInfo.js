import React, {Fragment, useEffect, useState} from "react";



// material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";


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
        marginBottom: 20
    },
    cart:{
        color: 'black',
    }
}));

//end material ui

const BottomInfo = () => {


    //material ui
    const classes = useStyles();



        return (
            <Fragment>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={11} sm={11} lg={8}>
                        <Paper elevation={3} className={classes.filter}>
                            <Typography style={{color: 'black', fontSize:'14px'}}>
                                Copyright © 2018-2021 TwerkZity. All rights reserved.
                            </Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid item xs={4} sm={4} lg={4}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <Link to='/privacy' style={{color: 'blue', textDecoration: 'none', fontSize:'14px'}}>
                                            Privacy
                                        </Link>
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sm={4} lg={4}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <Link to='/terms' style={{color: 'blue', textDecoration: 'none', fontSize:'14px'}}>
                                            Terms
                                        </Link>
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} sm={4} lg={4}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <Link to='/about' style={{color: 'blue', textDecoration: 'none', fontSize:'14px'}}>
                                            About
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>


            </Fragment>
        );

};

export default BottomInfo;