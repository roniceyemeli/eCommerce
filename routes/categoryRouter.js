const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/Auth')
const authAdmin = require('../middlewares/AuthAdmin')

router.route('/category')
    .get(categoryController.getCategories)
    .post(auth,authAdmin, categoryController.addCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)


module.exports = router;