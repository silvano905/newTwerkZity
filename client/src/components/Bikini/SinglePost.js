import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../layout/Spinner";
import {getPost, getPosts, addLike, removeLike, addViewsNumber} from "../../actions/post";


// material ui imports
import { makeStyles } from '@material-ui/core/styles';
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
import {Link, Redirect} from "react-router-dom";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: '5px auto 20px auto',
        background: "#f8f9fa",
        position: 'relative'

    },
    rootPremium: {
        minWidth: 275,
        margin: '5px auto 20px auto',
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
        height: "auto",
        maxHeight: 600,
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
        top: '95%',
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
        top: '95%',
        left: '38%',
        color: '#adb5bd',
    },
}));

//end material ui

const SinglePost = (props) => {
    const id = props.match.params.id;

    //material ui
    const classes = useStyles();
    //end

    const {user, loading, isAuthenticated} = useSelector(state => state.auth);
    const {post, loadingSinglePost} = useSelector(state => state.posts);


    const dispatch = useDispatch()

    useEffect(() => {
        //get all todos
        dispatch(getPost(id))
        if(isAuthenticated){
            dispatch(addViewsNumber(id))
        }
    }, []);


    //pagination
    //show 10 posts
    const [visible, setVisible] = useState(10)

    //everytime the user click [load more] show 5 more posts
    const showMoreItems = () => {
        setVisible(prevState => prevState + 5)
    }

    const isLikedChecker = (val) =>{
        return val.likes.some(like => like.user.toString() === user._id)
    }


    //if todos are not loading
    if (!loadingSinglePost) {
        if (isAuthenticated&&!user.paid&&post.premium) {
            return <Redirect to="/premium" />;
        }

        return (
            <Fragment>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">

                    <Grid item sm={11} lg={3} xs={11}>
                        <div key={post._id}>
                            {post.premium ?
                                <Card className={classes.rootPremium}>
                                    {/*if the post has a picture display it*/}
                                    <CardMedia
                                        component="video"
                                        className={classes.sectionDesktop}
                                        image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                        title="Twerk"
                                        controls
                                    />
                                    <CardMedia
                                        component="video"
                                        className={classes.sectionMobile}
                                        image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                        title="Twerk"
                                        controls
                                    />
                                    <CardContent className={classes.title}>
                                        <Typography variant="h6" gutterBottom>
                                            {post.text}
                                        </Typography>
                                    </CardContent>

                                    <CardActions style={{margin: '-20px 0 -12px 0'}}>

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
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Premium
                                        </Typography>
                                    </CardActions>

                                </Card>
                                :
                                <Card className={classes.root}>
                                    {/*if the post has a picture display it*/}
                                    <CardMedia
                                        component="video"
                                        className={classes.sectionDesktop}
                                        image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                        title="Twerk"
                                        controls
                                        controlsList="nodownload"
                                        onContextMenu={e => e.preventDefault()}
                                    />
                                    <CardMedia
                                        component="video"
                                        className={classes.sectionMobile}
                                        image={'https://projectlexus.s3.us-east-2.amazonaws.com/'+ post.image}
                                        title="Twerk"
                                        controls
                                        controlsList="nodownload"
                                        onContextMenu={e => e.preventDefault()}
                                    />
                                    <CardContent className={classes.title}>
                                        <Typography variant="h6" gutterBottom>
                                            {post.text}
                                        </Typography>
                                    </CardContent>

                                    <CardActions style={{margin: '-20px 0 -12px 0'}}>
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
                                        <Typography variant="h6" gutterBottom className={classes.premiumText}>
                                            Free
                                        </Typography>
                                    </CardActions>

                                </Card>
                            }
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        );
    } else {
        return (
            <Spinner/>

        )
    }
}
export default SinglePost;