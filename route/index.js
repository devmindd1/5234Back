const Router = require('express').Router;
const router = new Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const {signUpBody} = require('../models/bodyValidation/userBody');

router.post('/sign-up', signUpBody, userController.signUp);
router.post('/login', userController.login);
router.post('/logout', [authMiddleware], userController.logout);


module.exports = router;