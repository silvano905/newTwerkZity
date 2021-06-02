const BetSlip = require('../models/Post');
const User = require('../models/User');
const multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')

const Post = require('../models/Post')

const multer = require('multer');
const path = require('path');
// const upload = multer({dest: './client/public/uploads/'})

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: "./client/public/uploads/",
    filename: function(req, file, cb){
        cb(null,"postImage-" + Date.now() + path.extname(file.originalname));
    }
});


// limit 1mb
// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 20000000},
// }).single("myImage");




const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../config/s3')


// @route    POST api/post
// @desc     Create a post
// @access   Private
module.exports.post_create_post = async (req, res) => {

    try {
        const file = await req.file
        const result = await uploadFile(file)
        const user = await User.findById(req.user).select('-password');
        // res.send({imagePath: `/images/${result.Key}`})

        // let newPost;
        // if the user sent a picture else don't try to get the image filename

        if(file) {
            const newPost = new Post({
                user: user,
                author: user.name,
                premium: req.body.premium,
                text: req.body.text,
                views: req.body.views,
                image: file.filename+'.mp4'
            });
            const response = await newPost.save();
            res.json(response);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Post not created');
    }

};

// @route    GET api/post
// @desc     Get all post
// @access   Private
module.exports.get_all_posts = async (req, res) =>{

    try {
        const allPost = await Post.find().sort({ date: -1 });


        if(allPost.length<=0){
            res.json({message: `No posts`});
        }else {
            res.json(allPost);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};


// @route    GET api/post
// @desc     Get all post
// @access   Private
module.exports.get_all_favorites = async (req, res) =>{

    try {
        const allPost = await Post.find().sort({ date: -1 });

        let myFavorites = [];
        for (const [key, value] of Object.entries(allPost)) {
            if (value.likes.some(like => like.user.toString() === req.user)) {
                myFavorites.push(value)
            }
        }
        if(allPost.length<=0){
            res.json({message: `No posts`});
        }else {
            res.json(myFavorites);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

// @route    GET api/post
// @desc     Get all post
// @access   Private
module.exports.get_top_posts = async (req, res) =>{

    try {
        const allPost = await Post.find().sort({ likes: -1 });

        if(allPost.length<=0){
            res.json({message: `No posts`});
        }else {
            res.json(allPost);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

// @route    GET api/post
// @desc     Get all post
// @access   Private
module.exports.get_premium = async (req, res) =>{

    try {
        const allPost = await Post.find({ premium: true }).sort({ date: -1 });

        if(allPost.length<=0){
            res.json({message: `No posts`});
        }else {
            res.json(allPost);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

// @route    GET api/post
// @desc     Get all post
// @access   Private
module.exports.get_free = async (req, res) =>{

    try {
        const allPost = await Post.find({ premium: false }).sort({ date: -1 });

        if(allPost.length<=0){
            res.json({message: `No posts`});
        }else {
            res.json(allPost);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private

module.exports.put_like_post = async (req, res) =>{

    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.some(like => like.user.toString() === req.user)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user });

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private

module.exports.put_increase_views_number = async (req, res) =>{

    try {
        const post = await Post.findById(req.params.id);
        post.views += 1
        await post.save();
        return res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}


// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private

module.exports.put_unlike_post = async (req, res) =>{

    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has not yet been liked
        if (!post.likes.some(like => like.user.toString() === req.user)) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // remove the like
        post.likes = post.likes.filter(
            ({ user }) => user.toString() !== req.user
        );

        await post.save();

        return res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

// @route    GET api/post/:id
// @desc     Get post by id
// @access   Private
module.exports.get_postById= async (req, res) =>{

    try {
        const post = await Post.findById(req.params.id);
        // res.json(post);
        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};




