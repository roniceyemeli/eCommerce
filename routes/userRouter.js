const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Auth = require('../middlewares/Auth');
const {registerRules, validator} = require('../middlewares/Validator')



router.post('/register',registerRules(), validator, userController.register);

router.post('/login',userController.login);

router.get('/logout',userController.logout);

router.get('/refresh_token', userController.refreshToken);

router.get('/get_user', Auth, userController.getUser);

router.patch('/addcart', Auth, userController.addCart);





module.exports = router;