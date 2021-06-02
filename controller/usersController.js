const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const ResetPasswordSchema = require('../models/ForgotPassword')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


require('dotenv').config();
const sgMail = require('@sendgrid/mail')

//3 days
const maxAge = 3 * 24 * 60 * 60
//the id param comes from the user that was just created when this function is called
const createToken = (id) => {
    //secret to the application hash signature
    return jwt.sign({ id }, config.get('jwtSecret'), { expiresIn: maxAge });
};

const addDays = (date, days) =>{
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


module.exports.create_user = async (req, res) =>{
    //get the email and password from the post request
    const {name, email, password} = req.body;

    try {
        //try to create a user with the email and password provided
        const user = await User.create({name, email, password});
        //wait for the user const to run and then create a cookie
        const token = createToken(user._id);
        //return a cookie as a response
        res.cookie('jwtf1', token, { httpOnly: false, maxAge: maxAge * 1000 })
        //returns a response in json when you use fetch() in the signup view
        res.status(201).json({ user: user._id, token });

    }
    catch (err){
        res.status(400).json({ errors: 'User not created' });
    }
};

//get user info
module.exports.user_info = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.json(user);

    } catch (err) {
        res.status(500).send('Server Error');
    }
};

//get user info
module.exports.get_updated_user = async (req, res) =>{
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
        // const user = await User.findById(req.user).select('-password');
        // res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @route    POST api/user/update/:id
// @desc     edit quiniela
// @access   Private
module.exports.put_edit_user = async (req, res) =>{
    let {phone, name, email} = req.body;
    try {
        let profile = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {phone, name, email} },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(500).json({ errors: err });
    }

};

// @route    POST api/user/update/:id
// @desc     edit quiniela
// @access   Private
module.exports.put_paid_user = async (req, res) =>{
    let {days} = req.body;
    let expires = addDays(Date.now(), days)
    try {
        let profile = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {paid : true, subscription: expires} },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(500).json({ errors: err });
    }

};


module.exports.post_request_password_reset = async (req, res) =>{
    // try {
    //     const email = req.body.email
    //     const user = await User.findOne({email}).select('-password');
    //     const uuid = uuidv4();
    //     const request = {uuid, email: user.email,};
    //     const newReset = new ResetPasswordSchema(request);
    //     const addReset = await newReset.save();
    //     // sendResetLink(thisUser.email, id);
    //     //send email here
    //     res.status(200).json();
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).json({ errors: err });
    // }

    const email = req.body.email
    const user = await User.findOne({email}).select('-password');
    if(user){
        const uuid = uuidv4();
        const request = {uuid, email: user.email,};
        const newReset = new ResetPasswordSchema(request);
        const addReset = await newReset.save();

        const url = `https://www.racinghobbyist.com/reset/patch/${uuid}`

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email, // Change to your recipient
            from: 'support@racinghobbyist.com', // Change to your verified sender
            templateId: 'd-f9396195eb99487da8936d3214736781',
            dynamic_template_data: {url},
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        // sendResetLink(thisUser.email, id);
        //send email here
        res.status(200).json();
    }else {
        res.status(200).json({errors: 'no user with that email'});
    }

};


module.exports.patch_request_password_reset = async (req, res) =>{
    try {

        const findRequest = await ResetPasswordSchema.findOne({uuid: req.body.uuid})
        const user = await User.findOne({email:findRequest.email}).select('-password');

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);

        const results = await User.findOneAndUpdate(
            { email: user.email },
            { $set: {
                    password: password
                } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).sort({ date: -1 });

        res.status(200).json();

    } catch (err) {
        console.log(err)
        res.status(500).json({ errors: err });
    }

};