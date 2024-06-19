import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderAction";
import { clearOrderError } from "../../slices/orderSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const {error:orderError} = useSelector((state)=>state.orderState)
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if(orderError){
      toast(orderError,{
        type:'error',
        onOpen:()=>{
          dispatch(clearOrderError())
        }
      })
    }
  }, [navigate, shippingInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies) in the request
      };
      const { data } = await axios.post(
        "http://localhost:4898/api/v1/payment/process",
        paymentData,
        config
      );
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
  
      if (result.error) {
        console.log(result.error.message); // Log error message to console
        toast.error(result.error.message); // Display error message in toast
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment success !");
          order.paymentInfo={
            id: result.paymentIntent.id,
            status:result.paymentIntent.status
          }
          dispatch(orderCompleted());
          dispatch(createOrder(order))
          navigate("/order/success");
        } else {
          toast.warning("Please try again!");
        }
      }
    } catch (error) {
      // Handle other errors as needed
      console.error('Error processing payment:', error);
      toast.error('Error processing payment. Please try again later.');
    }
  };
  
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-4">Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
              value=""
            />
          </div>

          <button id="pay_btn" type="submit" className="btn btn-block py-3">
            Pay - {`$${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
