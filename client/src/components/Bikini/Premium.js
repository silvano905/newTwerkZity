import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../layout/Spinner";

// material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from "@material-ui/core/CardActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardHeader from '@material-ui/core/CardHeader';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        maxWidth: 350,
        margin: '5px auto 5px auto',
        border: '2px solid #4ea8de',
        marginBottom: 20,
        position: 'relative'

    },
    topCardText: {
        position: 'absolute',
        top: '18%',
        left: '72%',
        color: '#030303',
    },
    title:{
        textAlign: 'center',
        width: 230,
        background:'#b5b7b7',
        borderRadius: 8,
        margin: '15px auto 10px auto',
        color: 'white',
        marginBottom: 5
    },
    media: {
        height: 300,
        objectFit: "cover",
        marginBottom: 10
    },
    // div with className sectionDesktop will only appear when size is md or more
    //desktop size md or more will trigger it
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            height: 400,
            objectFit: "cover"
        },
    },

    // div with className sectionMobile will only appear when size is md or less
    //mobile size md or less will trigger it
    sectionMobile: {
        display: 'flex',
        height: 300,
        objectFit: "cover",
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    buttons:{
        textAlign: 'center',
        margin: "auto"
    },
    planButton: {
        marginBottom: '-20px'
    }
}));

//end material ui

const Premium = () => {

    //material ui
    const classes = useStyles();
    //end

    const {isAuthenticated, user, loading} = useSelector(state => state.auth);


    const dispatch = useDispatch()

    if (!isAuthenticated||!user.paid) {
        return (
            <Fragment>

                <Grid container spacing={0} direction="row" justify="center" alignItems="center">


                    {/*<Grid item sm={12} lg={12} xs={12}>*/}
                    {/*    <Typography variant="h6" gutterBottom className={classes.title}>*/}
                    {/*        Premium*/}
                    {/*    </Typography>*/}
                    {/*</Grid>*/}

                    <Grid item sm={12} lg={11} xs={12}>
                        <Fragment>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <DoneIcon color='primary'/> Premium content
                            </Typography>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <DoneIcon color='primary'/> New videos every day
                            </Typography>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <DoneIcon color='primary'/> Download videos
                            </Typography>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <DoneIcon color='primary'/> No recurring billing
                            </Typography>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <DoneIcon color='primary'/> One-time payment
                            </Typography>
                        </Fragment>
                    </Grid>

                    <Grid item sm={12} lg={4} xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        12-month full access
                                    </Typography>
                                    <Chip size="small" label="save 90%" className={classes.topCardText}/>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        $18
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <ButtonGroup color="primary" aria-label="outlined secondary button group" style={{margin: "-25px auto 0 auto"}}>
                                    <Link to={{pathname: "/pay", state: {days: 360, price: 18, months: 12}}} style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color='primary' style={{margin: '0 0 0 5px'}}>Get 12-Month access</Button>
                                    </Link>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item sm={12} lg={4} xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        5-month full access
                                    </Typography>
                                    <Chip size="small" label="save 60%" className={classes.topCardText}/>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        $12
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <ButtonGroup color="primary" aria-label="outlined secondary button group" style={{margin: "-25px auto 0 auto"}}>
                                    <Link to={{pathname: "/pay", state: {days: 150, price: 12, months: 5}}} style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color='primary' style={{margin: '0 0 0 5px'}}>Get 5-Month access</Button>
                                    </Link>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item sm={12} lg={4} xs={12}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary" component="p">
                                        1-month full access
                                    </Typography>
                                    <Chip size="small" label="save 0%" className={classes.topCardText}/>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        $7
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <ButtonGroup color="primary" aria-label="outlined secondary button group" style={{margin: "-25px auto 0 auto"}}>
                                    <Link to={{pathname: "/pay", state: {days: 30, price: 7, months: 1}}} style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color='primary' style={{margin: '0 0 0 5px'}}>Get 1-Month access</Button>
                                    </Link>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            </Fragment>
        );
    }else {
        return (
            <Spinner/>

        )
    }
};

export default Premium;