import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlices';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';


// Combining reducers
const rootReducer = combineReducers({
    productsState: productsReducer,
    productState:productReducer,
    authState:authReducer,
    cartState:cartReducer,
    orderState:orderReducer,
    userState:userReducer
});

// Configuring store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat() // No additional middleware needed as redux-thunk is included by default
});

export default store;
