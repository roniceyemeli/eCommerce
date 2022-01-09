const router = require('express').Router();
const productController = require('../controllers/productController');
const Auth = require("../middlewares/Auth");
const AuthAdmin = require("../middlewares/AuthAdmin");


router.route('/products')
    .get(productController.getProducts)
    .post(Auth, AuthAdmin, productController.addProduct)


router.route('/products/:id')
    .delete(Auth, AuthAdmin, productController.deleteProduct)
    .put(Auth, AuthAdmin, productController.updateProduct)


module.exports = router;