import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    loading: false,
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
  orderDetailFail
} = actions;

export default reducer;
