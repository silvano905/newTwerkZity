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
        margin: '5px 5px 5px 5px',
        color: 'black',
    }
}));

//end material ui

const Terms = () => {


    //material ui
    const classes = useStyles();



    return (
        <Fragment>
            <Grid container direction="row" justify="center" alignItems="center">
                <Paper elevation={3} className={classes.filter}>
                    <Typography variant="h5" gutterBottom className={classes.paragraph}>
                        Terms of Use
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.paragraph}>
                        IMPORTANT LEGAL NOTICE REGARDING TERMS OF USE OF TWERKZITY.COM
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        USER AGREEMENT
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        TwerkZity, LLC ("TwerkZity," "we," or "us") provides an online video service
                        which gives users the opportunity to select from various offerings
                        of twerk videos and other content (collectively, the "Content"). Our
                        video service, the Content, our player for viewing the
                        Content (the "Video Player") and any other products, features,
                        tools, materials, or other services (including third-party branded
                        services) offered from time to time by TwerkZity through a variety of
                        Access Points (defined below) are referred to collectively as the
                        "Services." The term "Access Points" refers to, collectively, the
                        TwerkZity.com website (the "TwerkZity Site"), applications, and other places
                        where any Services are available, including websites and applications
                        of TwerkZity's third-party distribution partners and other websites where
                        users or website operators are permitted to embed or have otherwise
                        licensed the Video Player.

                        Use of the Services (including access to the Content) is subject to
                        compliance with these Terms which incorporate by reference our Privacy
                        Policy available at TwerkZity.com/privacy ("Privacy Policy") and any end
                        user license agreement that might accompany the applicable Service.
                        Therefore, by accessing or using any of the Services through any
                        Access Point (including by visiting the TwerkZity Site or by downloading
                        or launching the TwerkZity application), you accept and agree to these
                        Terms. Please note that if you subscribe to a Service that is
                        available through a third-party website or application, your access
                        to and use of that Service will be subject to additional terms and
                        limitations specific to that Service.

                        Please note that the website addresses (i.e., URLs) included within
                        these Terms may not function as hyperlinks on all the Access Points.
                        To view these Terms with clickable hyperlinks, please visit the TwerkZity
                        Site on your computer.
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        CONSIDERATION
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        You agree to these Terms of Use by accessing or using the Website, registering for
                        Services offered on the Website, or by accepting, uploading, submitting or downloading
                        any information or content from or to the Website. IF YOU DO NOT AGREE TO BE BOUND BY ALL
                        OF THESE TERMS OF USE, DO NOT USE THE WEBSITE. These Terms of Use constitute a legal agreement
                        between you and RacingHobbyist, and shall apply to your use of the Website and
                        the Services even after termination.
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        ELIGIBILITY
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        You must be at least twenty-one (18) years of age to open an account with TwerkZity
                        ("Account").
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        REFUND POLICY
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        Deposits made on the Website will appear on your statement as TwerkZity. All
                        payments are final. No refunds will be issued. In the event of a dispute regarding
                        the identity of the person submitting an entry, the entry will be deemed submitted
                        by the person in whose name the Account was registered.
                    </Typography>
                </Paper>
            </Grid>
        </Fragment>
    );

};

export default Terms;