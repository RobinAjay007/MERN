import {
  adminOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
} from "../slices/orderSlice";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.post(
      "http://localhost:4898/api/v1/order/new",
      order,
      config
    );
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const userOrdersAction = async (dispatch) => {
  try {
    dispatch(userOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.get(
      "http://localhost:4898/api/v1/myorders",
      config
    );
    console.log(data);
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response.data.message));
  }
};

export const orderDetailActions = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.get(
      `http://localhost:4898/api/v1/order/${id}`,
      config
    );
    console.log(data);
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

export const adminOrders = async (dispatch) => {
  try {
    dispatch(adminOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.get(
      "http://localhost:4898/api/v1/admin/orders",
      config
    );
    console.log(data);
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.data.message));
  }
};
export const deleteOrders = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    await axios.delete(
      `http://localhost:4898/api/v1/admin/order/${id}`,
      config
    );
    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies) in the request
    };
    const { data } = await axios.put(
      `http://localhost:4898/api/v1/admin/order/${id}`,
      orderData,
      config
    );
    console.log(data);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};
