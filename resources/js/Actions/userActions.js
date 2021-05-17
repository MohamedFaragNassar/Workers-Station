import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT
        ,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS
        ,USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,
        UPDATE_PROFILE_FAIL,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,
        UPDATE_PERSONAL_IMAGE_FAIL,UPDATE_PERSONAL_IMAGE_REQUEST,UPDATE_PERSONAL_IMAGE_SUCCESS,
        CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,
        SEND_ACTIVATION_FAIL,SEND_ACTIVATION_REQUEST,SEND_ACTIVATION_SUCCESS,
        DELETE_ACCOUNT_FAIL,DELETE_ACCOUNT_REQUEST,DELETE_ACCOUNT_SUCCESS} from '../Constants/userConstants'

import Axios from "axios"

const login = (email,password,type) => (dispatch)=>{
    dispatch({type:USER_LOGIN_REQUEST})
        Axios.defaults.withCredentials = true;
        axios.get('/sanctum/csrf-cookie').then(async(response) => {
            if(type == "seller"){
               try{
                const {data} = await Axios.post("/api/sellerlogin",{email,password})
                dispatch({type:USER_LOGIN_SUCCESS,payload:data.user})
                localStorage.setItem("type",type)
               }catch(err){
                    if(err.message == "Request failed with status code 400"){
                        dispatch({type:USER_LOGIN_FAIL,payload:"Invalid credentials"})
                    }else{
                        dispatch({type:USER_LOGIN_FAIL,payload:err.message})
                    }
                }
            }else if(type=="client"){
                try{
                    const {data} = await Axios.post("/api/clientlogin",{email,password})
                    dispatch({type:USER_LOGIN_SUCCESS,payload:data.user})
                    localStorage.setItem("type",type)
                    
                }catch(err){
                    if(err.message == "Request failed with status code 400"){
                        dispatch({type:USER_LOGIN_FAIL,payload:"Invalid credentials"})
                    }else{
                        dispatch({type:USER_LOGIN_FAIL,payload:err.message})
                    }
                }
            }
        });
   
}

const register = (first_name,last_name,email,phone,address,password,type,daily_start,daily_end,location) => async(dispatch)=>{
    
        dispatch({type:USER_REGISTER_REQUEST})
        const formData = new FormData()
        if(type=="seller"){
            try{
                const {data} = await Axios.post(`/api/createseller`,{first_name,last_name,location,daily_end,
                    daily_start,phone,email,password})
                dispatch({type:USER_REGISTER_SUCCESS,payload:data})
            }catch(err){
                dispatch({type:USER_REGISTER_FAIL,payload:"Somthing went wrong, please check your data and try again"})

            }
        }else if(type=="client"){
           try{
            const {data} = await Axios.post(`/api/createclient`,{first_name,last_name,address,phone,email,password})
            dispatch({type:USER_REGISTER_SUCCESS,payload:data})
            
           }catch(err){
                dispatch({type:USER_REGISTER_FAIL,payload:"Somthing went wrong, please check your data and try again"})
            }
        }
       
    
}

const logout = () => async(dispatch) =>{
    await Axios.post("/api/logout")
    localStorage.removeItem("userdata")
    dispatch({type:USER_LOGOUT})
    window.location.href="/"
}

const getProfile = (id,type) => async(dispatch) =>{
    dispatch({type:USER_DETAILS_REQUEST})
    try{
        if(type=="client"){
            const {data} = await Axios.post(`/api/client/`,{id})
            dispatch({type:USER_DETAILS_SUCCESS,payload:data.client})
        }else if(type=="seller"){
            const {data} = await Axios.post(`/api/seller/`,{id})
            dispatch({type:USER_DETAILS_SUCCESS,payload:data})
        }
        
    }catch(err){
        dispatch({type:USER_DETAILS_FAIL,payload:err})
    }
}

const updateProfile = (first_name,last_name,email,phone,address,daily_start,daily_end,type,id) => async(dispatch) =>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try{
       
        if(type=="seller"){
            const {data} = await Axios.post(`/api/updateseller/`,{id,first_name,last_name,email,
                                                                    phone,daily_start,daily_end})
            dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.seller})
            dispatch({type:USER_DETAILS_SUCCESS,payload:data.seller})
            localStorage.setItem("userdata",JSON.stringify(data.seller))
        }else if(type=="client"){
            const {data} = await Axios.post(`/api/updateclient/`,{id,first_name,last_name,address,phone,email})
            dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.client})
            dispatch({type:USER_DETAILS_SUCCESS,payload:data.client})
            localStorage.setItem("userdata",JSON.stringify(data.client))
        }

    }catch(err){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const sendActivation = (type,email) => async(dispatch,getState) =>{
    dispatch({type:SEND_ACTIVATION_REQUEST})
    try{
        const formData = new FormData()
        formData.append("email",email)
        const {data} = await Axios.post(`api/activation.php?type=${type}`,formData)
        dispatch({type:SEND_ACTIVATION_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:SEND_ACTIVATION_FAIL,payload:err})
    }
}


const updatePersonalImage = (image,id,type) => async(dispatch)=>{
    dispatch({type:UPDATE_PERSONAL_IMAGE_REQUEST})
    if(type == "client"){
        try{
            const {data} = await Axios.post(`/api/clientprofile?id=${id}`,image)
            dispatch({type:UPDATE_PERSONAL_IMAGE_SUCCESS,payload:data})
        }catch(err){
            dispatch({type:UPDATE_PERSONAL_IMAGE_FAIL,payload:err})
        }
    }else{
        try{
            const {data} = await Axios.post(`/api/sellerprofile?id=${id}`,image)
            dispatch({type:UPDATE_PERSONAL_IMAGE_SUCCESS,payload:data})
        }catch(err){
            dispatch({type:UPDATE_PERSONAL_IMAGE_FAIL,payload:err})
        }
    }
}

const changePassword = (password,current) => async(dispatch,getState) =>{
    dispatch({type:CHANGE_PASSWORD_REQUEST})
    try{
        const {userSignIn:{userData}} = getState() 
        const {data} = await Axios.patch("users/changepassword",{password,current},{
            headers:{
                "Authorization":`Token ${userData.token}`,
            }
        })
        localStorage.setItem("userdata",JSON.stringify(data))
        dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:CHANGE_PASSWORD_FAIL,payload:err.response.data[Object.keys(err.response.data)[0]]})
    }
}

const deleteAccount = (type) => async(dispatch) =>{
    dispatch({type:DELETE_ACCOUNT_REQUEST})
    try{
        const formData = new FormData()
        formData.append("type",type)
        const {data} = await Axios.post(`api/deleteaccount.php`,formData)
        if(data.includes("ok")){
            dispatch({type:DELETE_ACCOUNT_SUCCESS,payload:data})
        }else{
            dispatch({type:DELETE_ACCOUNT_FAIL,payload:"error"})
        }
    }catch(err){
        dispatch({type:DELETE_ACCOUNT_FAIL,payload:err})
    }
}


export {login,register,logout,getProfile,updateProfile,changePassword
    ,updatePersonalImage,sendActivation,deleteAccount}