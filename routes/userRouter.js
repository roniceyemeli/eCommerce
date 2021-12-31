const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {registerRules, validator} = require('../middlewares/Validator')



router.post('/register',registerRules, validator, userController.register);

router.post('/login',userController.login);

router.get('/logout',userController.logout);



module.exports = router;