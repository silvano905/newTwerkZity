import React, {Fragment, useEffect, useState} from "react";



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
        margin: '12px 8px 15px 8px',
        width: '100%'
    },
    title:{
        textAlign: 'left',
        borderRadius: 8,
        margin: '10px 5px 10px 5px',
        color: 'black',
    },
    paragraph:{
        textAlign: 'left',
        borderRadius: 8,
        margin: '10px 5px 10px 5px',
        color: 'black',
    },
    single:{
        textAlign: 'left',
        borderRadius: 8,
        marginTop: -5,
        color: 'black',
    },
    paragraphTwo:{
        textAlign: 'left',
        borderRadius: 8,
        margin: '10px 5px 10px 5px',
        color: 'blue',
    }

}));

//end material ui

const About = () => {


    //material ui
    const classes = useStyles();



    return (
        <Fragment>
            <Grid container direction="row" justify="center" alignItems="center">
                <Paper elevation={3} className={classes.filter}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        About
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        Exclusive twerk videos from around the world. TwerkZity is THE
                        place to watch twerk videos. Daily uploads and thousands of videos coming soon.
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Stats
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraphTwo}>
                        36k+
                        <Typography variant="subtitle1" gutterBottom className={classes.single}>
                            Verified users
                        </Typography>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraphTwo}>
                        1K+
                        <Typography variant="subtitle1" gutterBottom className={classes.single}>
                            Twerk videos
                        </Typography>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraphTwo}>
                        8
                        <Typography variant="subtitle1" gutterBottom className={classes.single}>
                            Employees
                        </Typography>
                    </Typography>
                </Paper>
            </Grid>
        </Fragment>
    );

};

export default About;