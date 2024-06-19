/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";


const productSlice=createSlice({
    name:'product',
    initialState:{
        loading:false,
        product:{},
        isReviewSubmitted:false
    },
    reducers:{
        productRequest(state, action){
            return{
                ...state,
                loading:true
                
            }
        },
        productSuccess(state, action){
            return{
                ...state,
                loading:false,
                product:action.payload.product
            }
        },
        productFail(state, action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        }, 
        createReviewRequest(state, action){
            return{
                ...state,
                loading:true
                
            }
        },
        createReviewSuccess(state, action){
            return{
                ...state,
                loading:false,
                isReviewSubmitted: true,
            }
        },
        createReviewFail(state, action){
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        },
        clearReviewSubmitted(state,action){
            return{
                ...state,
                isReviewSubmitted:false
            }
        },
        // eslint-disable-next-line no-unused-vars
        clearError(state,action){
            return{
            ...state,
            error:null
            }
        },
        clearProduct(state,action){
            return{
                ...state,
                product:{}
            }
        }
    }
});

const {actions,reducer}= productSlice;

export const {productRequest,productSuccess,productFail,createReviewRequest,createReviewSuccess,createReviewFail, clearError,clearReviewSubmitted,clearProduct}=actions;

export default reducer;