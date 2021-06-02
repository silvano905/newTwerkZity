const User = require('../models/User');
const PaymentIntent = require('../models/PaymentIntent')
const squareConnect = require('square-connect');
const crypto = require('crypto');
require('dotenv').config();

const stripe = require('stripe')(process.env.stripeAccess);

async function addWinners(days, user) {
    const addDays = (date, days) =>{
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    let expires = addDays(Date.now(), days)
    let profile = await User.findOneAndUpdate(
        { _id: user },
        { $set: {paid : true, subscription: expires} },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await profile.save()
}

module.exports.post_create_payment_intent = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');

        const newPaymentIntent = new PaymentIntent({
            user: user,
            price: req.body.price,
            days: req.body.days,
        });
        const savenewPaymentIntent = await newPaymentIntent.save();
        //end code
        res.json(savenewPaymentIntent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports.get_payment= async (req, res) =>{
    const amount = 12

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });
    const intent = paymentIntent;
    res.json({client_secret: intent.client_secret});

};

// Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.accessTokenSquare;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';


module.exports.post_payment_square= async (req, res) =>{
    const request_params = req.body;
    const userPaymentIntent = await PaymentIntent.findOne({user: req.user}).sort({ date: -1 });
    // length of idempotency_key should be less than 45
    const idempotency_key = crypto.randomBytes(22).toString('hex');

    // Charge the customer's card
    const payments_api = new squareConnect.PaymentsApi();
    const request_body = {
        source_id: request_params.nonce,
        amount_money: {
            amount: userPaymentIntent.price * 100, // £1.00 charge
            currency: 'USD'
        },
        idempotency_key: idempotency_key
    };

    try {
        const response = await payments_api.createPayment(request_body);
        // await User.findOneAndUpdate(
        //     { _id: req.user },
        //     { $set: {paid: true} },
        //     { new: true, upsert: true, setDefaultsOnInsert: true }
        // );
        await addWinners(parseInt(userPaymentIntent.days), req.user)
        res.status(200).json({
            'title': 'Payment Successful',
            'result': response
        });
    } catch(error) {
        res.status(500).json({
            'title': 'Payment Failure',
            'result': error.response.text
        });
    }

};


