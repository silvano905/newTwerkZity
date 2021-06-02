const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const Report = require('../models/ReportVideo')


module.exports.post_create_report = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');


        const newReport = new Report({
            user: user,
            social: req.body.social,
            image: req.body.image
        });
        const saveReport = await newReport.save();
        //end code
        res.json(saveReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

