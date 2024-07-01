const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router=express.Router();
const multer=require('multer')
const path=require('path')
const {isAuthenticateUser, authorizeRoles}=require('../middlewares/authenticate')



const upload=multer({storage: multer.diskStorage({
    destination: function (req,file,cb){
      cb(null,path.join(__dirname,'..','uploads/product'))
    },
    filename: function (req,file,cb){
      cb(null,file.originalname)
    }
  })})

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
// router.route('/product/update/:id').put(updateProduct);
// router.route('/product/delete/:id').delete(deleteProduct);
router.route('/review').put(isAuthenticateUser,createReview);
router.route('/reviews').get(getReviews);
router.route('/review').delete(deleteReview);

// Admin Route
router.route('/admin/product/new').post(isAuthenticateUser,authorizeRoles('admin'),upload.array('images'),newProduct);
router.route('/admin/products').get(isAuthenticateUser,authorizeRoles('admin'),getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticateUser,authorizeRoles('admin'),deleteProduct);
router.route('/admin/product/:id').put(isAuthenticateUser,authorizeRoles('admin'),upload.array('images'),updateProduct);

module.exports = router
