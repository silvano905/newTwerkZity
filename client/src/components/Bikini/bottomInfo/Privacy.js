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

const Privacy = () => {


    //material ui
    const classes = useStyles();



    return (
        <Fragment>
            <Grid container direction="row" justify="center" alignItems="center">
                <Paper elevation={3} className={classes.filter}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Privacy Policy
                    </Typography>

                    <Typography variant="h6" gutterBottom className={classes.title}>
                        1. Introduction
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        The term “TwerkZity Services” refers to our video service, including the selection of
                        videos, and other content we offer (collectively,
                        the “Content”) and our player for viewing the Content (the “Video Player”), as
                        well as any other products, features, tools, materials, or other services offered
                        from time to time by TwerkZity through a variety of Access Points. The
                        term “Access Points” refers to, collectively, the TwerkZity.com
                        website (the “TwerkZity Site”), applications, and other places through which
                        the TwerkZity Services may be accessed, including websites and applications of
                        TwerkZity’s third-party distribution partners and other websites where users or
                        website operators are permitted to embed or have otherwise licensed the
                        Video Player. The information practices of third-party Access Points are
                        governed by their own privacy policies and are not governed by this
                        Privacy Policy; accordingly, we recommend you review the privacy policies
                        of these third parties. Please also note that the TwerkZity Services may
                        contain links to other sites owned or operated by other companies, including
                        our advertisers, and TwerkZity does not notify you when you have chosen to
                        click through to another website or property when using the TwerkZity
                        Services. We recommend that you review the privacy policies of such
                        other websites or properties.

                        By viewing any Content or otherwise using the TwerkZity Services, whether you
                        are a subscriber, other registered user, or a visitor who has not
                        subscribed to or registered for the TwerkZity Services, you consent to
                        this Privacy Policy.
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        We will not disclose or provide any of your personal information to third parties without a
                        review from our legal team and prior consent from the User.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        TwerkZity will not share or sell your personal information with third parties.
                    </Typography>

                    <Typography variant="h6" gutterBottom className={classes.title}>
                        2. Security and Account Access
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={classes.paragraph}>
                        The security of your information is important to us. We use a variety of physical, technical,
                        and administrative measures to safeguard information in our possession against loss,
                        theft and unauthorized use, disclosure, and modification. For example, we take steps
                        to limit access to sensitive information from or about you to those TwerkZity employees,
                        agents, and contractors who have a legitimate business reason to access such
                        information. We also use measures like encryption and hashing to help protect
                        sensitive information when in transmission.

                        Despite these efforts, please note that there is always a possibility that a
                        breach in data transmission or storage may occur and we cannot guarantee the
                        security of any information from or about you 100% of the time. Please refer
                        to the U.S. Federal Trade Commission’s website for information on how to protect
                        yourself from identity theft.

                        Please note that if you allow others to use your account (including others you
                        permit to set up profiles under your account), they may be able to view information
                        about your account or any of the profiles under your account, including information
                        about the videos you view and your email address.
                    </Typography>

                </Paper>
            </Grid>
        </Fragment>
    );

};

export default Privacy;