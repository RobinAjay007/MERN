const express= require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router= express.Router();
const {
    isAuthenticateUser,
    authorizeRoles,
  } = require("../middlewares/authenticate");


router.route('/order/new').post(isAuthenticateUser,newOrder);
router.route('/order/:id').get(isAuthenticateUser,getSingleOrder);
router.route('/myorders').get(isAuthenticateUser,myOrders);


//Admin Routes
router.route('/orders').get(isAuthenticateUser,authorizeRoles('admin'),orders);
router.route('/order/:id').put(isAuthenticateUser,authorizeRoles('admin'),updateOrder);
router.route('/order/:id').delete(isAuthenticateUser,authorizeRoles('admin'),deleteOrder);

module.exports = router;