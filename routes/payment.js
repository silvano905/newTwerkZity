const { Router } = require('express');
const paymentController = require('../controller/paymentController');
const auth = require('../middleware/auth');

//create router instance
const router = Router();

router.get('/secret/:id', paymentController.get_payment);
router.post('/square',auth, paymentController.post_payment_square);
router.post('/payment',auth, paymentController.post_create_payment_intent);



module.exports = router;