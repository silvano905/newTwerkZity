const { Router } = require('express');
const auth = require('../middleware/auth');
const reportController = require('../controller/ReportVideoController');

//create router instance
const router = Router();
router.post('/', auth, reportController.post_create_report);



module.exports = router;