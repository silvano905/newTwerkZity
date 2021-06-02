import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../layout/Spinner";
import {deletePost, getPosts, addLike, removeLike} from "../../actions/post";
import Moment from 'react-moment';
import AddPost from "../todo/AddPost";
import {getTopPosts, getFree, getPremium} from "../../actions/post";
import ReportVideo from "./ReportVideo";

import BottomInfo from "./bottomInfo/BottomInfo";


// material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CardActions from "@material-ui/core/CardActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: 5,
        maxWidth: 350,
        background: "#f8f9fa",
        position: 'relative'

    },
    rootPremium: {
        minWidth: 275,
        maxWidth: 350,
        margin: 5,
        background: "#f8f9fa",
        border: '2px solid #4ea8de',
        position: 'relative',
    },
    title:{
        textAlign: 'center',
        color: 'black',
        marginTop: -20
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
    playIcon: {
        height: 38,
        width: 38,
        position: 'absolute',
        top: '35%',
        left: '45%',
        color: 'white',
    },
    premiumText: {
        height: 38,
        width: 38,
        position: 'absolute',
        top: '92%',
        left: '67%',
        color: '#adb5bd',
    },
    views: {
        position: 'absolute',
        top: '95%',
        left: '0%',
        color: '#adb5bd',
    },
    likeButton: {
        position: 'absolute',
        top: '91%',
        left: '38%',
        color: '#adb5bd',
    },
}));

//end material ui

const Home = () => {
    //material ui
    const classes = useStyles();
    //end

    const {user, loading, isAuthenticated} = useSelector(state => state.auth);
    const {posts, loadingPosts} = useSelector(state => state.posts);


    const dispatch = useDispatch()

    useEffect(() => {
        //get all todos
        dispatch(getPosts())
    }, [loading,loadingPosts]);


    //pagination
    //show 10 posts
    const [visible, setVisible] = useState(10)

    //everytime the user click [load more] show 5 more posts
    const showMoreItems = () =>{
        setVisible(prevState => prevState + 5)
    }
    //end pagination


    const isLikedChecker = (val) =>{
        return val.likes.some(like => like.user.toString() === user._id)
    }

    //if todos are not loading
    if (!loadingPosts) {

        let postList;
        if(posts.length>0) {


            postList = posts.slice(0, visible).map(post => {

                return (
                    <Grid item sm={11} lg={3} xs={11}>
                        <div key={post._id}>
                            {post.premium ?
                                <Card className={classes.rootPremium}>
                                    {/*if the post has a picture display it*/}
                                    <Link to={'/'+ post._id} style={{textDecoration: 'none'}}>
                                        <CardMedia
                                            component="video"
                                            className={classes.sectionDesktop}
                                            image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                            title="Twerk"
                                        />
                                        <CardMedia
                                            component="video"
                                            className={classes.sectionMobile}
                                            image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                            title="Twerk"
                                        />
                                        <PlayArrowIcon className={classes.playIcon} />
                                    </Link>
                                    <CardContent className={classes.title}>
                                        <Typography variant="h6" gutterBottom>
                                            {post.text}
                                        </Typography>
                                    </CardContent>

                                    <CardActions style={{margin: '-15px 0 -12px 0'}}>
                                        <Typography variant="body1" gutterBottom>
                                            {post.views} views
                                        </Typography>
                                        {/*if user is authenticated and [const liked] returned something: */}
                                        {/*else add button to like post if user authenticated and post not liked already:*/}
                                        {/*else just display a button without onClick handle because user is not authenticated*/}

                                        {isAuthenticated && isLikedChecker(post) ?
                                            <Button onClick={() => dispatch(removeLike(post._id))} className={classes.likeButton}>
                                                <Badge badgeContent={post.likes.length} color="primary">
                                                    <FavoriteIcon style={{color: '#d00000'}}/>
                                                </Badge>
                                            </Button>
                                            :
                                            isAuthenticated ?
                                                <Button onClick={() => dispatch(addLike(post._id))} className={classes.likeButton}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                                :
                                                <Button className={classes.likeButton}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                        }
                                        {/*<Badge color="primary" anchorOrigin={{vertical: 'top', horizontal: 'right',}} badgeContent={5700} max={10000} className={classes.views}>*/}
                                        {/*    <RemoveRedEyeOutlinedIcon/>*/}
                                        {/*</Badge>*/}
                                        <ReportVideo image={post.image}/>
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Premium
                                        </Typography>
                                    </CardActions>

                                </Card> :
                                <Card className={classes.root}>
                                    {/*if the post has a picture display it*/}
                                    <Link to={'/free/'+ post._id} style={{textDecoration: 'none'}}>
                                        <CardMedia
                                            component="video"
                                            className={classes.sectionDesktop}
                                            image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                            title="Twerk"
                                        />
                                        <CardMedia
                                            component="video"
                                            className={classes.sectionMobile}
                                            image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                            title="Twerk"
                                        />
                                        <PlayArrowIcon className={classes.playIcon} />
                                    </Link>
                                    <CardContent className={classes.title}>
                                        <Typography variant="h6" gutterBottom>
                                            {post.text}
                                        </Typography>
                                    </CardContent>

                                    <CardActions style={{margin: '-15px 0 -12px 0'}}>
                                        <Typography variant="body1" gutterBottom>
                                            {post.views} views
                                        </Typography>
                                        {/*if user is authenticated and [const liked] returned something: */}
                                        {/*else add button to like post if user authenticated and post not liked already:*/}
                                        {/*else just display a button without onClick handle because user is not authenticated*/}
                                        {isAuthenticated && isLikedChecker(post) ?
                                            <Button onClick={() => dispatch(removeLike(post._id))} className={classes.likeButton}>
                                                <Badge badgeContent={post.likes.length} color="primary">
                                                    <FavoriteIcon style={{color: '#d00000'}}/>
                                                </Badge>
                                            </Button>
                                            :
                                            isAuthenticated ?
                                                <Button onClick={() => dispatch(addLike(post._id))} className={classes.likeButton}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                                :
                                                <Button className={classes.likeButton}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                        }
                                        <ReportVideo image={post.image}/>
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Free
                                        </Typography>
                                    </CardActions>

                                </Card>
                            }
                        </div>
                    </Grid>
                )
            });
        }



        return (
            <Fragment>

                <Grid container spacing={0} direction="row" justify="center" alignItems="center">

                    {isAuthenticated && user._id === "609ff1d6508fe0490471bccd" ?
                        <Fragment>
                            <Grid item sm={12} lg={12} xs={12}>
                                <AddPost/>
                            </Grid>
                        </Fragment>:null
                    }

                    <Grid item xs={12} sm={12} lg={12}>
                        <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                            <ButtonGroup color="primary" aria-label="outlined secondary button group" style={{marginTop: 5}}>
                                <Button onClick={() => dispatch(getTopPosts())}>Top</Button>
                                <Button onClick={() => dispatch(getFree())}>Free</Button>
                                <Button onClick={() => dispatch(getPosts())}>New</Button>
                            </ButtonGroup>
                        </div>
                    </Grid>


                    {/*<Grid item sm={12} lg={12} xs={12}>*/}
                    {/*    <Typography variant="h6" gutterBottom className={classes.title}>*/}
                    {/*        All posts from users*/}
                    {/*    </Typography>*/}
                    {/*</Grid>*/}

                    {postList}

                    <Grid item xs={7} sm={7} lg={7}>
                        {posts.length > visible ?
                            <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                                <Button onClick={showMoreItems} variant="contained" style={{marginBottom: 12}}>
                                    Load More
                                </Button>
                            </div>
                            :
                            <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                                <Button variant="contained" style={{marginBottom: 12}} disabled>No more posts</Button>
                            </div>
                        }
                    </Grid>
                </Grid>

                <BottomInfo/>

            </Fragment>
        );
    }else {
        return (
            <Spinner/>

        )
    }
};

export default Home;