import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../layout/Spinner";
import {deletePost, getPosts, addLike, removeLike} from "../../actions/post";
import {getFavorites} from "../../actions/post";


// material ui imports
import { makeStyles } from '@material-ui/core/styles';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
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
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: 5,
        background: "#f8f9fa",
        position: 'relative'

    },
    rootPremium: {
        minWidth: 275,
        margin: 5,
        background: "#f8f9fa",
        border: '2px solid #4ea8de',
        position: 'relative'
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
    paperNoBg: {
        border: 0,
        borderRadius: 10,
        margin: "10px auto 8px auto",
        textAlign: 'center',
        color: '#343a40',
        background: '#f8f9fa',
        maxWidth: 700,
    }
}));

//end material ui

const Favorites = () => {

    //material ui
    const classes = useStyles();
    //end

    const {user, loading, isAuthenticated} = useSelector(state => state.auth);
    const {posts, loadingPosts} = useSelector(state => state.posts);


    const dispatch = useDispatch()

    useEffect(() => {
        //get all todos
        if(isAuthenticated&&user._id) {
            dispatch(getFavorites(user._id))
        }
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
    if (!loadingPosts&&!loading) {

        let postList;
        if(posts.length>0) {


            postList = posts.slice(0, visible).map(post => {

                return (
                    <Grid item sm={11} lg={3} xs={11}>
                        <div key={post._id}>
                            {post.premium && user.paid ?
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

                                    <CardActions style={{margin: '-20px 0 -12px 0'}}>

                                        {/*if user is authenticated and [const liked] returned something: */}
                                        {/*else add button to like post if user authenticated and post not liked already:*/}
                                        {/*else just display a button without onClick handle because user is not authenticated*/}

                                        {isAuthenticated && isLikedChecker(post) ?
                                            <Button onClick={() => dispatch(removeLike(post._id))}>
                                                <Badge badgeContent={post.likes.length} color="primary">
                                                    <FavoriteIcon/>
                                                </Badge>
                                            </Button>
                                            :
                                            isAuthenticated ?
                                                <Button onClick={() => dispatch(addLike(post._id))}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                                :
                                                <Button>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                        }
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Premium
                                        </Typography>
                                    </CardActions>

                                </Card> :
                                !post.premium ?
                                <Card className={classes.root}>
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

                                    <CardActions style={{margin: '-20px 0 -12px 0'}}>
                                        {/*if user is authenticated and [const liked] returned something: */}
                                        {/*else add button to like post if user authenticated and post not liked already:*/}
                                        {/*else just display a button without onClick handle because user is not authenticated*/}
                                        {isAuthenticated && isLikedChecker(post) ?
                                            <Button onClick={() => dispatch(removeLike(post._id))}>
                                                <Badge badgeContent={post.likes.length} color="primary">
                                                    <FavoriteIcon/>
                                                </Badge>
                                            </Button>
                                            :
                                            isAuthenticated ?
                                                <Button onClick={() => dispatch(addLike(post._id))}>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                                :
                                                <Button>
                                                    <Badge badgeContent={post.likes.length} color="primary">
                                                        <FavoriteBorderOutlinedIcon/>
                                                    </Badge>
                                                </Button>
                                        }
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Free
                                        </Typography>
                                    </CardActions>

                                </Card>:null
                            }
                        </div>
                    </Grid>
                )
            });
        }



        return (
            <Fragment>

                <Grid container spacing={0} direction="row" justify="center" alignItems="center">

                    <Grid item sm={11} lg={12} xs={11}>
                        <Paper elevation={3} className={classes.paperNoBg}>
                            <Typography variant="h6" gutterBottom>
                                Favorites
                            </Typography>
                        </Paper>

                    </Grid>

                    {postList}

                    <Grid item xs={12} sm={12} lg={12}>
                        {posts.length > visible ?
                            <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                                <Button onClick={showMoreItems} variant="contained" style={{marginBottom: 12}}>
                                    Load More
                                </Button>
                            </div>
                            :
                            posts.length<visible?
                                <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                                    <Typography variant="body1" gutterBottom style={{textAlign: 'center', color: '#adb5bd'}}>
                                        no more
                                    </Typography>
                                    <SentimentVeryDissatisfiedIcon style={{color: '#adb5bd', marginBottom: 8}}/>
                                </div>
                                :null
                        }
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

export default Favorites;