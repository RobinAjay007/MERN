const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController');
const router=express.Router();
const {isAuthenticateUser, authorizeRoles}=require('../middlewares/authenticate')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/update/:id').put(updateProduct);
router.route('/product/delete/:id').delete(deleteProduct);
router.route('/review').put(isAuthenticateUser,createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);

// Admin Route
router.route('/admin/product/new').post(isAuthenticateUser,authorizeRoles('admin'),newProduct);

module.exports = router
