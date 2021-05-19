import {ADMIN_LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGOUT,
        DELETE_LOCATION,DELETE_LOCATION_FAIL,DELETE_LOCATION_REQUEST,DELETE_LOCATION_SUCCESS
        ,DELETE_SERVICE,DELETE_SERVICE_FAIL,DELETE_SERVICE_REQUEST,DELETE_SERVICE_SUCCESS,
        DELETE_USER,DELETE_USER_FAIL,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,
        ADD_LOCATION,ADD_LOCATION_FAIL,ADD_LOCATION_REQUEST,ADD_LOCATION_SUCCESS,ADD_SERVICE,ADD_SERVICE_FAIL
        ,ADD_SERVICE_REQUEST,ADD_SERVICE_SUCCESS,UPDATE_SERVICE,UPDATE_SERVICE_FAIL,
        UPDATE_SERVICE_REQUEST,UPDATE_SERVICE_SUCCESS,GET_USERS_FAIL,GET_USERS_REQUEST,GET_USERS_SUCCESS,
        GET_ADMIN_LOCATION_FAIL,GET_ADMIN_LOCATION_REQUEST,GET_ADMIN_LOCATION_SUCCESS,
        GET_ADMIN_SERVICES_FAIL,GET_ADMIN_SERVICES_REQUEST,GET_ADMIN_SERVICES_SUCCESS} from '../Constants/AdminConstants'
import Axios from "axios"
Axios.defaults.withCredentials = true;


const adminLogin = (email,password) => async (dispatch)=>{
    try{
        dispatch({type:ADMIN_LOGIN_REQUEST})
        Axios.defaults.withCredentials = true;
        axios.get('/sanctum/csrf-cookie').then(async(response) => {
            const {data} = await Axios.post(`/api/adminlogin`,{email,password})
            dispatch({type:ADMIN_LOGIN_SUCCESS,payload:data.user})
            localStorage.setItem("adminData",JSON.stringify(data.user))

        });
       
    }catch(err){
        if(err.message == "Request failed with status code 400"){
            dispatch({type:ADMIN_LOGIN_FAIL,payload:"Invalid credentials"})
        }else{
            dispatch({type:ADMIN_LOGIN_FAIL,payload:err.message})
        }
    }
}


const addService = (name) => async (dispatch)=>{
    try{
        dispatch({type:ADD_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/addservice`,{name})
        dispatch({type:ADD_SERVICE_SUCCESS,payload:data})
        dispatch({type:ADD_SERVICE,payload:data})
    }catch(err){
        dispatch({type:ADD_SERVICE_FAIL,payload:err})
    }
}

const deleteService = (name) => async (dispatch)=>{
    try{
        console.log(name)
        dispatch({type:DELETE_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/deleteservice`,{name})
        dispatch({type:DELETE_SERVICE_SUCCESS,payload:data})
        dispatch({type:DELETE_SERVICE,payload:name})
    }catch(err){
        dispatch({type:DELETE_SERVICE_FAIL,payload:err})
    }
}

const updateService = (name,status) => async (dispatch)=>{
    try{
        dispatch({type:UPDATE_SERVICE_REQUEST})
        const {data} = await Axios.post(`/api/updateservice`,{name,status})
        dispatch({type:UPDATE_SERVICE_SUCCESS,payload:data})
        dispatch({type:UPDATE_SERVICE,payload:data})
    }catch(err){
        dispatch({type:UPDATE_SERVICE_FAIL,payload:err})
    }
}

const addLocation = (name) => async (dispatch)=>{
    try{
        dispatch({type:ADD_LOCATION_REQUEST})
        const {data} = await Axios.post(`/api/addlocation`,{name})
        dispatch({type:ADD_LOCATION_SUCCESS,payload:data})
        dispatch({type:ADD_LOCATION,payload:data})
    }catch(err){
        dispatch({type:ADD_LOCATION_FAIL,payload:err})
    }
}

const deleteLocation = (name) => async (dispatch)=>{
    try{
        dispatch({type:DELETE_LOCATION_REQUEST})
        const {data} = await Axios.post(`/api/deletelocation`,{name})
        dispatch({type:DELETE_LOCATION_SUCCESS,payload:data})
        dispatch({type:DELETE_LOCATION,payload:name})
    }catch(err){
        dispatch({type:DELETE_LOCATION_FAIL,payload:err})
    }
}

const deleteUser = (id,type) => async (dispatch)=>{
    try{
        dispatch({type:DELETE_USER_REQUEST})
        const {data} = await Axios.post(`/api/${type == "client"? "deleteclient":"deleteseller"}`,{id})
        dispatch({type:DELETE_USER_SUCCESS,payload:data})
        dispatch({type:DELETE_USER,payload:id})
    }catch(err){
        dispatch({type:DELETE_USER_FAIL,payload:err})
    }
}
const getUsers = (type) => async (dispatch)=>{
    try{
        dispatch({type:GET_USERS_REQUEST})
        const {data} = await Axios.get(`/api/${type}s`)
        dispatch({type:GET_USERS_SUCCESS,payload:data.users})
    }catch(err){
        dispatch({type:GET_USERS_FAIL,payload:err})
    }
}

const getServices = () => async (dispatch)=>{
    try{
        dispatch({type:GET_ADMIN_SERVICES_REQUEST})
        const {data} = await Axios.get(`/api/adminservices`)
        dispatch({type:GET_ADMIN_SERVICES_SUCCESS,payload:data.services})
    }catch(err){
        dispatch({type:GET_ADMIN_SERVICES_FAIL,payload:err})
    }
}

const getLocations = () => async (dispatch)=>{
    try{
        dispatch({type:GET_ADMIN_LOCATION_REQUEST})
        const {data} = await Axios.get(`/api/adminlocations`)
        dispatch({type:GET_ADMIN_LOCATION_SUCCESS,payload:data.locations})
    }catch(err){
        dispatch({type:GET_ADMIN_LOCATION_FAIL,payload:err})
    }
}



export {adminLogin,addLocation,addService,deleteLocation,deleteUser,deleteService,updateService
    ,getUsers,getLocations,getServices}