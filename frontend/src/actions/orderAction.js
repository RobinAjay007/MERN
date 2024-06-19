import { createOrderFail, createOrderRequest, createOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, userOrderFail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice"
import axios from 'axios'

export const createOrder = order => async(dispatch)=>{
    try{
        dispatch(createOrderRequest());
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Include credentials (cookies) in the request
          };
        const {data}= await axios.post("http://localhost:4898/api/v1/order/new",order,config);
        dispatch(createOrderSuccess(data))
    }
    catch(error){
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const userOrdersAction = async(dispatch)=>{
  try{
      dispatch(userOrderRequest());
      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials (cookies) in the request
        };
      const {data}= await axios.get("http://localhost:4898/api/v1/myorders",config);
      console.log(data)
      dispatch(userOrderSuccess(data))
  }
  catch(error){
      dispatch(userOrderFail(error.response.data.message))
  }
}

export const orderDetailActions = id  => async(dispatch)=>{
  try{
      dispatch(orderDetailRequest());

      console.log(id,"ascggahcvh")
      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials (cookies) in the request
        };
      const {data}= await axios.get(`http://localhost:4898/api/v1/order/${id}`,config);
      console.log(data)
      dispatch(orderDetailSuccess(data))
  }
  catch(error){
      dispatch(orderDetailFail(error.response.data.message))
  }
}


