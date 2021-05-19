import Axios from "axios"
import {GET_SELLER_ORDERS_FAIL,GET_SELLER_ORDERS_REQUEST,GET_SELLER_ORDERS_SUCCESS,
    GET_CLIENT_ORDERS_FAIL,GET_CLIENT_ORDERS_REQUEST,GET_CLIENT_ORDERS_SUCCESS,
    ADD_ORDER_FAIL,ADD_ORDER_REQUEST,ADD_ORDER_SUCCESS,ADD_ORDER,
    UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER,
    ADD_RATING_FAIL,ADD_RATING_REQUEST,ADD_RATING_SUCCESS} from '../Constants/ordersConstants'



const getSellerOrders = (id) => async (dispatch)=>{
    try{
        dispatch({type:GET_SELLER_ORDERS_REQUEST})
        const {data} = await Axios.post(`/api/sellerorders`,{id})
        dispatch({type:GET_SELLER_ORDERS_SUCCESS,payload:data.orders})
    }catch(err){
        dispatch({type:GET_SELLER_ORDERS_FAIL,payload:err})
    }
}

const getClientOrders = (id) => async (dispatch)=>{
    try{
        dispatch({type:GET_CLIENT_ORDERS_REQUEST})
        const {data} = await Axios.post(`/api/clientorders`,{id})
        dispatch({type:GET_CLIENT_ORDERS_SUCCESS,payload:data.orders})
    }catch(err){
        dispatch({type:GET_CLIENT_ORDERS_FAIL,payload:err})
    }
}


const addOrder = (service,seller_id,amount,client_id,start,image) => async (dispatch)=>{
    try{
        dispatch({type:ADD_ORDER_REQUEST})
        const formData = new FormData()
        formData.append("service",service)
        formData.append("seller_id",seller_id)
        formData.append("client_id",client_id)
        formData.append("amount",amount)
        formData.append("start",start)
        formData.append("image",image)
        
        const {data} = await Axios.post('/api/addorder',formData)
        dispatch({type:ADD_ORDER_SUCCESS,payload:data.order})
        dispatch({type:ADD_ORDER,payload:data.order})
    }catch(err){
        dispatch({type:ADD_ORDER_FAIL,payload:err})
    }
}

const addRating = (id,value) => async (dispatch)=>{
    try{
        
        const {data} = await Axios.post('/api/rating',{id,value})
        if(data.success){
            dispatch({type:ADD_RATING_SUCCESS,payload:data})
        }else{
           dispatch({type:ADD_RATING_FAIL,payload:data})
        }

    }catch(err){
        dispatch({type:ADD_RATING_FAIL,payload:err})
    }
}

const updateOrder = (id,status) => async (dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST})
        const {data} = await Axios.post(`/api/updateorder`,{id,status})
        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.order})
        dispatch({type:UPDATE_ORDER,payload:[id,status]})
   }catch(err){
        dispatch({type:UPDATE_ORDER_FAIL,payload:err})
    }
}

export {getSellerOrders,getClientOrders,addOrder,updateOrder,addRating}