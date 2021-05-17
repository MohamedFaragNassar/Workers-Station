import {ADMIN_LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGOUT,
        GET_USERS_FAIL,GET_USERS_SUCCESS,GET_USERS_REQUEST,DELETE_USER,ADD_SERVICE,DELETE_LOCATION,
        GET_ADMIN_SERVICES_REQUEST,GET_ADMIN_SERVICES_SUCCESS,GET_ADMIN_SERVICES_FAIL,
        GET_ADMIN_LOCATION_SUCCESS,GET_ADMIN_LOCATION_REQUEST,GET_ADMIN_LOCATION_FAIL,
        DELETE_SERVICE,ADD_LOCATION} from '../Constants/AdminConstants'

const adminLoginReducer = (state={},action)=>{
    switch(action.type){
        case ADMIN_LOGIN_REQUEST:
            return {loading:true}
        case ADMIN_LOGIN_SUCCESS:
            return {loading:false,adminData:action.payload}
        case ADMIN_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        case ADMIN_LOGOUT :
            return {}   
        default:
            return state    
    }
}
const adminGetUsers = (state={},action)=>{
    switch(action.type){
        case GET_USERS_REQUEST:
            return {loading:true}
        case GET_USERS_SUCCESS:
            return {loading:false,users:action.payload}
        case GET_USERS_FAIL:
            return {loading:false,error:action.payload}
        case DELETE_USER :
            return{users:state.users.filter(e => e.id != action.payload)}
        default:
            return state    
    }
}

const adminGetServices = (state={},action)=>{
    switch(action.type){
        case GET_ADMIN_SERVICES_REQUEST:
            return {loading:true}
        case GET_ADMIN_SERVICES_SUCCESS:
            return {loading:false,services:action.payload}
        case GET_ADMIN_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        case ADD_SERVICE:
            return {services:[[action.payload,0],...state.services]}
        case DELETE_SERVICE :
            return{services:state.services.filter(e => e[0].name != action.payload)} 
        default:
            return state    
    }
}

const adminGetLocations = (state={},action)=>{
    switch(action.type){
        case GET_ADMIN_LOCATION_REQUEST:
            return {loading:true}
        case GET_ADMIN_LOCATION_SUCCESS:
            return {loading:false,locations:action.payload}
        case GET_ADMIN_LOCATION_FAIL:
            return {loading:false,error:action.payload}
        case ADD_LOCATION:
                return {locations:[[action.payload,1],...state.locations]}
        case DELETE_LOCATION :
            return{locations:state.locations.filter(e => e[0].name != action.payload)} 
        default:
            return state    
    }
}



export {adminLoginReducer,adminGetUsers,adminGetServices,adminGetLocations}