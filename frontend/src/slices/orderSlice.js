/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    adminOrders:[],
    loading: false,
    isOrderDeleted:false,
    isOrderUpdated:false,
    error: null // Initialize error as null
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null // Clear any previous errors on request
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
        error: null // Clear error on success
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload // Store error message
      };
    },
    // eslint-disable-next-line no-unused-vars
    clearOrderError(state, action) {
      return {
        ...state,
        error: null
      };
    },
    // eslint-disable-next-line no-unused-vars
    userOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    userOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders,
        error: null
      };
    },
    userOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    // eslint-disable-next-line no-unused-vars
    orderDetailRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
        error: null
      };
    },
    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    adminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    adminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
        error: null
      };
    },
    adminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    deleteOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted:true,
        error: null
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    updateOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    updateOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated:true,
        error: null
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    clearOrderDeleted(state,action){
      return{
        ...state,
        isOrderDeleted:false
      }
    },
    clearOrderUpdated(state,action){
      return{
        ...state,
        isOrderUpdated:false
      }
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearOrderError,
  userOrderRequest,
  userOrderSuccess,
  userOrderFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrderFail,
  adminOrderRequest,
  adminOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  clearOrderDeleted,
  clearOrderUpdated
} = actions;

export default reducer;
