import Axios from "axios"
import {GET_LOCATIONS_FAIL,GET_LOCATIONS_REQUEST,GET_LOCATIONS_SUCCESS,
    GET_SERVICES_FAIL,GET_SERVICES_REQUEST,GET_SERVICES_SUCCESS,ADD_SERVING,DELETE_SERVING,UPDATE_SERVING,
    ADD_SERVICE_FAIL,ADD_SERVICE_REQUEST,ADD_SERVICE_SUCCESS,
    GET_SELLER_SERVING_FAIL,GET_SELLER_SERVING_REQUEST,GET_SELLER_SERVING_SUCCESS,
    DELETE_SERVICE_FAIL,DELETE_SERVICE_REQUEST,DELETE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,UPDATE_SERVICE_REQUEST,UPDATE_SERVICE_SUCCESS,
    GET_ONE_SERVICE_FAIL,GET_ONE_SERVICE_REQUEST,GET_ONE_SERVICE_SUCCESS,
    GET_TOPTEN_FAIL,GET_TOPTEN_REQUEST,GET_TOPTEN_SUCCESS,
    GET_TOPFOUR_FAIL,GET_TOPFOUR_REQUEST,GET_TOPFOUR_SUCCESS,
    GET_BY_SERVICE_FAIL,GET_BY_SERVICE_REQUEST,GET_BY_SERVICE_SUCCESS,
    SEARCH_FAIL,SEARCH_REQUEST,SEARCH_SUCCESS} from '../Constants/servicesConstants'


const getServices = () => async (dispatch)=>{
    try{
        dispatch({type:GET_SERVICES_REQUEST})
        const {data} = await Axios.get(`/api/allservices`)
        dispatch({type:GET_SERVICES_SUCCESS,payload:data.services})
    }catch(err){
        dispatch({type:GET_SERVICES_FAIL,payload:err})
    }
}

const getLocations = () => async (dispatch)=>{
    dispatch({type:GET_LOCATIONS_REQUEST})
    try{
        const {data} = await Axios.get(`/api/locations`)
        dispatch({type:GET_LOCATIONS_SUCCESS,payload:data.locations})
    }catch(err){
        dispatch({type:GET_LOCATIONS_FAIL,payload:err})
    }
}

const addServing = (service,seller_id,price,snippet,details,discount,image) => async (dispatch)=>{
    try{
        dispatch({type:ADD_SERVICE_REQUEST})

        const formData = new FormData()
        formData.append("service",service)
        formData.append("seller_id",seller_id)
        formData.append("price",price)
        formData.append("snippet",snippet)
        formData.append("details",details)
        formData.append("discount",discount)
        formData.append("image",image)

        const {data} = await Axios.post(`/api/addserving`,formData)
        dispatch({type:ADD_SERVICE_SUCCESS,payload:data.offer})
        dispatch({type:ADD_SERVING,payload:{
            "service":service,
            "seller_id":seller_id,
            "price":price,
            "snippet":snippet,
            "details":details,
            "discount":discount,
        }})
        
    }catch(err){
        console.log(err)
        if(err.message.includes("Duplicate entry")){
            dispatch({type:ADD_SERVICE_FAIL,payload:"You Have ALready added this Service"})
        }else{
            dispatch({type:ADD_SERVICE_FAIL,payload:err.message})
        }
    }
}

const updateService = (service,seller_id,price,snippet,details,discount,image) => async (dispatch) => {
    try{
        dispatch({type:UPDATE_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/updateserving`,{service,seller_id,price,snippet,details,discount})
        dispatch({type:UPDATE_SERVICE_SUCCESS,payload:data})
            dispatch({type:UPDATE_SERVING,payload:{
                "service":service,
                "seller_id":seller_id,
                "price":price,
                "snippet":snippet,
                "details":details,
                "discount":discount,
            }})
    }catch(err){
        dispatch({type:UPDATE_SERVICE_FAIL,payload:err})
    }
}


const getSellerServing = (id) => async (dispatch)=>{
    try{
        dispatch({type:GET_SELLER_SERVING_REQUEST})
        const {data} = await Axios.post(`/api/sellerserving`,{id})
        dispatch({type:GET_SELLER_SERVING_SUCCESS,payload:data.offers})
    }catch(err){
        dispatch({type:GET_SELLER_SERVING_FAIL,payload:err})
    }
}

const deleteService = (id,service) => async (dispatch)=>{
    dispatch({type:DELETE_SERVICE_REQUEST})
    try{
        const {data} = await Axios.post('/api/deleteserving',{id,service})
        dispatch({type:DELETE_SERVICE_SUCCESS,payload:data})
        dispatch({type:DELETE_SERVING,payload:service})
        
    }catch(err){
        dispatch({type:DELETE_SERVICE_FAIL,payload:"Somthing went wrong when tying to update the service, please try again"})
    }
}

const getOneServing = (id,service) => async (dispatch)=>{
    try{
        dispatch({type:GET_ONE_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/offer`,{id,service})
        dispatch({type:GET_ONE_SERVICE_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:GET_ONE_SERVICE_FAIL,payload:err})
    }
}

const getTopTen = ()=>  async (dispatch)=>{
    try{
        dispatch({type:GET_TOPTEN_REQUEST})
        const {data} = await Axios.get("/api/toptenrated")
        dispatch({type:GET_TOPTEN_SUCCESS,payload:data.offers})
    }catch(err){
        dispatch({type:GET_TOPTEN_FAIL,payload:err})
    }
}

const getTopFour = ()=>  async (dispatch)=>{
    try{
        dispatch({type:GET_TOPFOUR_REQUEST})
        const {data} = await Axios.get(`/api/topfourrated`)
        dispatch({type:GET_TOPFOUR_SUCCESS,payload:data.offers})
    }catch(err){
        dispatch({type:GET_TOPFOUR_FAIL,payload:err})
    }
}

const getByService = (service) =>  async (dispatch)=>{
    try{
        dispatch({type:GET_BY_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/service`,{service})
        dispatch({type:GET_BY_SERVICE_SUCCESS,payload:data.offers})
    }catch(err){
        dispatch({type:GET_BY_SERVICE_FAIL,payload:err})
    }
}

const search = (keyword) => async (dispatch)=>{
    try{
        dispatch({type:SEARCH_REQUEST})
        const {data} = await Axios.post("/api/search",{keyword})
        dispatch({type:SEARCH_SUCCESS,payload:data.result})
    }catch(err){
        dispatch({type:SEARCH_FAIL,payload:err})
    }
}

export {getServices,getLocations,addServing,getSellerServing,deleteService,updateService,
        getOneServing,getTopTen,getTopFour,getByService,search}