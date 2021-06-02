import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../images/logo192.png'


//appbar content /material ui imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from "@material-ui/core/Button";
import StayCurrentPortraitIcon from '@material-ui/icons/StayCurrentPortrait';
import {PhoneAndroidRounded} from "@material-ui/icons";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginLeft: 5,
        flexGrow: 1,
    },
    logo: {
        width: 60,
        height: "auto",
    },

    // div with className sectionDesktop will only appear when size is md or more
    //desktop size md or more will trigger it
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    // div with className sectionMobile will only appear when size is md or less
    //mobile size md or less will trigger it
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}));


const Navbar = () => {

    const {isAuthenticated, loading} = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navbarForUser = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{background: 'linear-gradient(45deg, #480ca8 30%, #4ea8de 90%)'}}>
                    <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                        <PhoneAndroidRounded fontSize='large' style={{color: '#ffff3f'}}/>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Twerk
                    </Typography>


                    {/*this div display only for desktop*/}
                    <div className={classes.sectionDesktop}>
                        {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
                        {/*    <Typography>*/}
                        {/*        <Link to='/my-posts' style={{color: 'white', textDecoration: 'none'}}>*/}
                        {/*            Ganadores*/}
                        {/*        </Link>*/}
                        {/*    </Typography>*/}
                        {/*</IconButton>*/}

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Typography>
                                <Link to='/member' style={{color: 'white', textDecoration: 'none'}}>
                                    Premium
                                </Link>
                            </Typography>
                        </IconButton>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Typography>
                                <Link to='/account' style={{color: 'white', textDecoration: 'none'}}>
                                    My Account
                                </Link>
                            </Typography>
                        </IconButton>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Typography>
                                <Link to='/my-likes' style={{color: 'white', textDecoration: 'none'}}>
                                    <FavoriteBorderOutlinedIcon style={{color:'red'}}/>
                                </Link>
                            </Typography>
                        </IconButton>

                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Button size="small" onClick={() => dispatch(logout())} type="submit" variant="contained" style={{backgroundColor: '#343a40', color:'white', margin: '0 3px 0 0'}}>Logout</Button>
                        </IconButton>
                    </div>


                    {/*this div display only for mobile*/}
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to='/account' style={{color: 'black', textDecoration: 'none'}}>
                                    My Account
                                </Link>
                            </MenuItem>
                            {/*<MenuItem onClick={handleClose}>*/}
                            {/*    <Link to='/my-posts' style={{color: 'black', textDecoration: 'none'}}>*/}
                            {/*        Ganadores*/}
                            {/*    </Link>*/}
                            {/*</MenuItem>*/}
                            <MenuItem>
                                <Button size="small" onClick={() => dispatch(logout())} type="submit" variant="contained" style={{backgroundColor: '#343a40', color:'white', margin: '0 3px 0 0'}}>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );


    const navbarForGuest = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{background: 'linear-gradient(45deg, #480ca8 30%, #4ea8de 90%)'}}>
                    <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                        <PhoneAndroidRounded fontSize='large' style={{color: '#ffff3f'}}/>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Twerk
                    </Typography>

                    <Link to='/login' style={{color: 'white', textDecoration: 'none'}}>
                        <Button size="small" variant="contained" style={{backgroundColor: '#343a40', color:'white', margin: '0 3px 0 0'}}>Login</Button>
                    </Link>
                    <Link to='/register' style={{color: 'white', textDecoration: 'none'}}>
                        <Button size="small" variant="contained" style={{backgroundColor: '#343a40', color:'white'}}>Register</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </div>
    );

    // if user is authenticated display [const navbarForUser] else display [const navbarForGuest]
    return (
        <Fragment>{!loading && isAuthenticated ? navbarForUser : navbarForGuest}</Fragment>
    );

};

export default Navbar;