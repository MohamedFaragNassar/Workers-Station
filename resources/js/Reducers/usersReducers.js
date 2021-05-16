import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS
    ,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_LOGOUT
,USER_DETAILS_SUCCESS,USER_DETAILS_REQUEST,USER_DETAILS_FAIL
,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_FAIL
,UPDATE_PERSONAL_IMAGE_SUCCESS,UPDATE_PERSONAL_IMAGE_REQUEST,UPDATE_PERSONAL_IMAGE_FAIL,
CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,
SEND_ACTIVATION_FAIL,SEND_ACTIVATION_REQUEST,SEND_ACTIVATION_SUCCESS,
DELETE_ACCOUNT_FAIL,DELETE_ACCOUNT_REQUEST,DELETE_ACCOUNT_SUCCESS} from '../Constants/userConstants'

const loginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false,userData:action.payload}
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT :
            return {}   
        default:
            return state    
    }
}

const registerReducer = (state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,registeredUser:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const profileReducer = (state={},action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true}
        case USER_DETAILS_SUCCESS:
            return {loading:false,profile:action.payload}
        case USER_DETAILS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const updateProfileReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return {loading:true}
        case UPDATE_PROFILE_SUCCESS:
            return {loading:false,updatedProfile:action.payload}
        case UPDATE_PROFILE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const updatePersonalImageReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PERSONAL_IMAGE_REQUEST:
            return {loading:true}
        case UPDATE_PERSONAL_IMAGE_SUCCESS:
            return {loading:false,image:action.payload}
        case UPDATE_PERSONAL_IMAGE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  changePasswordReducer = (state={},action)=>{
    switch(action.type){
        case CHANGE_PASSWORD_REQUEST:
            return {loading:true}
        case CHANGE_PASSWORD_SUCCESS:
            return {loading:false,data:action.payload}
        case CHANGE_PASSWORD_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}



const  sendActivationReducer = (state={},action)=>{
    switch(action.type){
        case SEND_ACTIVATION_REQUEST:
            return {loading:true}
        case SEND_ACTIVATION_SUCCESS:
            return {loading:false,activate:action.payload}
        case SEND_ACTIVATION_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}


const deleteAccountReducer = (state={},action)=>{
    switch(action.type){
        case DELETE_ACCOUNT_REQUEST:
            return {loading:true}
        case DELETE_ACCOUNT_SUCCESS:
            return {loading:false,delAccount:action.payload}
       case DELETE_ACCOUNT_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}


export {loginReducer,registerReducer,profileReducer,updateProfileReducer,updatePersonalImageReducer,
    changePasswordReducer,sendActivationReducer,deleteAccountReducer}