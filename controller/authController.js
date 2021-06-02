const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');


//3 days
const maxAge = 3 * 24 * 60 * 60
//the id param comes from the user that was just created when this function is called
const createToken = (id) => {
    //secret to the application hash signature
    return jwt.sign({ id }, config.get('jwtSecret'), { expiresIn: maxAge });
};


//login user
module.exports.login_user = async (req, res) =>{
    //get the email and password from the post request
    const {email, password} = req.body;
    try {
        //try to login user with the email and password provided
        const user = await User.login(email, password);
        //wait for the user const to run and then create a cookie
        const token = createToken(user._id);
        //return a cookie as a response
        res.cookie('jwtf1', token, { httpOnly: true, maxAge: maxAge * 1000 });
        //returns a response in json when you use fetch() in the login view
        res.status(200).json({ user: user._id });

    }
    catch (err){
        //return all errors as json when you call fetch() to login view
        res.status(400).json({ errors: 'Invalid Credentials' })
    }
};


module.exports.logout_get = (req, res) => {
    //get the cookie and change maxAgo to i millisecond so that the cookie expires and we logout the current user
    res.cookie('jwtf1', '', { maxAge: 1 });
    //after logout successful redirect the user to homepage
    res.status(200).json('logout successful');
};


// this was moved to usersController
module.exports.user_info = async (req, res) =>{
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};