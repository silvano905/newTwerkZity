const { Router } = require('express');
const betSlipController = require('../controller/postController');
const auth = require('../middleware/auth');
const {uploadVideo} = require('../controller/postController')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


//create router instance
const router = Router();

router.post('/',auth,upload.single('image'), betSlipController.post_create_post);
router.get('/', betSlipController.get_all_posts);
router.get('/top', betSlipController.get_top_posts);
router.get('/premium', betSlipController.get_premium);
router.get('/free', betSlipController.get_free);
router.put('/like/:id',auth, betSlipController.put_like_post);
router.put('/add/:id',auth, betSlipController.put_increase_views_number);
router.put('/unlike/:id',auth, betSlipController.put_unlike_post);
router.get('/:user_id',auth, betSlipController.get_all_favorites);
router.get('/byId/:id', betSlipController.get_postById);




module.exports = router;