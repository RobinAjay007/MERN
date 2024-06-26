import { useEffect, useState } from "react";
import "./App.css";
import Header from "../src/components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProductDetail from "./components/product/productDetail";
import ProductSearch from "./components/product/productSearch";
import Login from "./components/user/login";
import Register from "./components/user/register";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import{Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrder from "./components/order/UserOrder";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";

function App() {
const [stripeApiKey,setStripeApiKey]=useState("")
useEffect(()=>{
  store.dispatch(loadUser);
  async function getStripeApiKey() {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials (cookies) in the request
      };
      const { data } = await axios.get('http://localhost:4898/api/v1/stripeapi',config);
      setStripeApiKey(data.stripeApiKey); // Set the stripeApiKey state
      console.log(stripeApiKey)
    } catch (error) {
      console.error('Error fetching Stripe API key:', error);
      // Handle error fetching API key
    }
  }
  getStripeApiKey()
},[stripeApiKey])
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail/>} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/myprofile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
              <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
              <Route path="/password/forgot" element={<ForgotPassword/>} />
              <Route path="/password/reset/:token" element={<ResetPassword/>} />
              <Route path="cart" element={<Cart/>} />
              <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
              <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><UserOrder/></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderDetail/></ProtectedRoute>} />
              {stripeApiKey&&(
                <Route path="/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>} />
              )}
            </Routes>
          </div>
          <Routes>
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
            <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>}/>
            <Route path="/admin/products/create" element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
            <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>}/>
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
