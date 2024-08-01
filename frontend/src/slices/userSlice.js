/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:{},
        users:[],
        isUserUpdated:false,
        isUserDeletd:false,
    },
    reducers:{
        usersRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        usersSuccess(state, action){
            return{
                loading:false,
                users:action.payload.users,
            }
        },
        usersFail(state, action){
            return{
                loading:false,
                error: action.payload
            }
        },
        userRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        userSuccess(state, action){
            return{
                ...state,
                loading:false,
                user:action.payload.user,
            }
        },
        userFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        deleteUserRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        deleteUserSuccess(state, action){
            return{
                ...state,
                loading:false,
                isUserDeleted:true,
            }
        },
        deleteUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        updateUserRequest(state, action){
            return{
                ...state,
                loading:true
            }
        },
        updateUserSuccess(state, action){
            return{
                ...state,
                loading:false,
                isUserDeleted:true,
            }
        },
        updateUserFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        clearUserDeleted(state,action){
            return{
                ...state,
                isUserDeletd:false
            }
        },
        clearUserUpdated(state,action){
            return{
                ...state,
                isUserUpdated:false

            }
        }
    }
});

const {actions,reducer}= userSlice;

export const {productsRequest,productsSuccess,productsFail,adminProductsRequest,adminProductsFail,adminProductsSuccess,usersRequest,usersSuccess,usersFail,userFail,userRequest,userSuccess,deleteUserFail,deleteUserRequest,deleteUserSuccess,updateUserFail,updateUserRequest,updateUserSuccess}=actions;

export default reducer;