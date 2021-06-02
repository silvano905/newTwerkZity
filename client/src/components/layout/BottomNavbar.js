import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Hidden from '@material-ui/core/Hidden';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {useSelector} from "react-redux";


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: 'linear-gradient(45deg, #f8f9fa 30%, #ffffff 90%)',
        color: 'black'

    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        margin: '0 auto'

    },
    info:{
        backgroundColor: '#f6f6f6',
        padding: 5,
        border: '2px solid #4ea8de',
        borderRadius: 10,
        color: '#480ca8',
        textAlign: 'center',
        width: 90,
    }
}));




const BottomNavbar = () => {

    const classes = useStyles();
    const {isAuthenticated, loading, user} = useSelector(state => state.auth);


    return (
        <Fragment>

            <CssBaseline />
            <Hidden smUp implementation="css">
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="open drawer">
                            <Link to='/' style={{ color: 'black' }}>
                                <HomeIcon fontSize="large" style={{ color: '#480ca8' }}/>
                            </Link>
                        </IconButton>
                        {isAuthenticated && user.paid?
                            <IconButton edge="start" color="inherit" className={classes.fabButton}>
                                <Link to='/member' style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="subtitle1" gutterBottom className={classes.info}>
                                        Premium
                                    </Typography>
                                </Link>
                            </IconButton>:
                            <IconButton edge="start" color="inherit" className={classes.fabButton}>
                                <Link to='/premium' style={{ color: 'black', textDecoration: 'none' }}>
                                    <Typography variant="subtitle1" gutterBottom className={classes.info}>
                                        Premium
                                    </Typography>
                                </Link>
                            </IconButton>
                        }

                        {/*<Fab aria-label="add" className={classes.fabButton}>*/}
                        {/*    <Link to='/cart' style={{ color: '#bfc0c0' }}>*/}
                        {/*        Premium*/}
                        {/*    </Link>*/}
                        {/*</Fab>*/}

                        <div className={classes.grow} />
                        <IconButton edge="end" color="inherit">
                            <Link to='/my-likes' style={{ color: 'black' }}>
                                <FavoriteBorderOutlinedIcon style={{color:'red'}}/>
                            </Link>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
            </Hidden>
        </Fragment>
    );
}




export default BottomNavbar;