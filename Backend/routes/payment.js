const express = require("express");
const router = express.Router();
const {isAuthenticateUser} = require("../middlewares/authenticate");
const { processPayments ,sendStripeApi} = require("../controllers/paymentController");


router.route('/payment/process').post(isAuthenticateUser, processPayments);
router.route('/stripeapi').get(isAuthenticateUser, sendStripeApi);

module.exports = router;