const { Router } = require('express');
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

//create router instance
const router = Router();

router.post('/', authController.login_user);
router.get('/',auth, authController.user_info);
router.get('/logout', authController.logout_get);


module.exports = router;