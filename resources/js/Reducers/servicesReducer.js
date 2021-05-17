import {GET_LOCATIONS_FAIL,GET_LOCATIONS_REQUEST,GET_LOCATIONS_SUCCESS,
    GET_SERVICES_FAIL,GET_SERVICES_REQUEST,GET_SERVICES_SUCCESS,ADD_SERVING,DELETE_SERVING,UPDATE_SERVING,
    GET_SELLER_SERVING_FAIL,GET_SELLER_SERVING_REQUEST,GET_SELLER_SERVING_SUCCESS,
    ADD_SERVICE_FAIL,ADD_SERVICE_REQUEST,ADD_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,DELETE_SERVICE_REQUEST,DELETE_SERVICE_SUCCESS,
    GET_ONE_SERVICE_FAIL,GET_ONE_SERVICE_REQUEST,GET_ONE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,UPDATE_SERVICE_REQUEST,UPDATE_SERVICE_SUCCESS,
    GET_TOPTEN_FAIL,GET_TOPTEN_REQUEST,GET_TOPTEN_SUCCESS,
    GET_TOPFOUR_FAIL,GET_TOPFOUR_REQUEST,GET_TOPFOUR_SUCCESS,
    GET_BY_SERVICE_FAIL,GET_BY_SERVICE_REQUEST,GET_BY_SERVICE_SUCCESS,
    SEARCH_FAIL,SEARCH_REQUEST,SEARCH_SUCCESS} from '../Constants/servicesConstants'

import {ADD_SERVICE,DELETE_SERVICE,ADD_LOCATION,DELETE_LOCATION} from '../Constants/AdminConstants'
    


const getServicesReducer = (state={},action)=>{
    switch(action.type){
        case GET_SERVICES_REQUEST:
            return {loading:true}
        case GET_SERVICES_SUCCESS:
            return {loading:false,services:action.payload}
        case GET_SERVICES_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const getLocationsReducer = (state={},action)=>{
    switch(action.type){
        case GET_LOCATIONS_REQUEST:
            return {loading:true}
        case GET_LOCATIONS_SUCCESS:
            return {loading:false,locations:action.payload}
        case GET_LOCATIONS_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const addServingReducer = (state={},action)=>{
    switch(action.type){
        case ADD_SERVICE_REQUEST:
            return {addServingLoading:true}
        case ADD_SERVICE_SUCCESS:
            return {addServingLoading:false,addServing:action.payload}
        case ADD_SERVICE_FAIL:
            return {addServingLoading:false,AddServingError:action.payload} 
        default:
            return state 
    }
}

const deleteServingReducer = (state={},action)=>{
    switch(action.type){
        case DELETE_SERVICE_REQUEST:
            return {deleteServingLoading:true}
        case DELETE_SERVICE_SUCCESS:
            return {deleteServingLoading:false,deleteServing:action.payload}
        case DELETE_SERVICE_FAIL:
            return {deleteServingLoading:false,deleteServingError:action.payload} 
        default:
            return state 
    }
}

const updateServingReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_SERVICE_REQUEST:
            return {updateServingLoading:true}
        case UPDATE_SERVICE_SUCCESS:
            return {updateServingLoading:false,updateServing:action.payload}
        case UPDATE_SERVICE_FAIL:
            return {updateServingLoading:false,updateServingError:action.payload} 
        default:
            return state 
    }
}

const getOneServingReducer = (state={},action)=>{
    switch(action.type){
        case GET_ONE_SERVICE_REQUEST:
            return {loading:true}
        case GET_ONE_SERVICE_SUCCESS:
            return {loading:false,serving:action.payload}
        case GET_ONE_SERVICE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}



const getSellerServingReducer = (state={},action)=>{
    switch(action.type){
        case GET_SELLER_SERVING_REQUEST:
            return {loading:true}
        case GET_SELLER_SERVING_SUCCESS:
            return {loading:false,servings:action.payload}
        case ADD_SERVING:
            return {servings:[...state.servings,action.payload]}
        case UPDATE_SERVING :
            const x1 = state.servings.filter(e => e.service != action.payload.service)
            const x2 = [...x1,action.payload]
            return {servings:x2}
        case DELETE_SERVING:
            return {servings:state.servings.filter(e => e.service != action.payload)}
        case GET_SELLER_SERVING_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}


const  getToTenReducer = (state={},action)=>{
    switch(action.type){
        case GET_TOPTEN_REQUEST:
            return {loading:true}
        case GET_TOPTEN_SUCCESS:
            return {loading:false,highlightedServices:action.payload}
        case GET_TOPTEN_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  getToFourReducer = (state={},action)=>{
    switch(action.type){
        case GET_TOPFOUR_REQUEST:
            return {loading:true}
        case GET_TOPFOUR_SUCCESS:
            return {loading:false,data:action.payload}
        case GET_TOPFOUR_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  getByServiceReducer = (state={},action)=>{
    switch(action.type){
        case GET_BY_SERVICE_REQUEST:
            return {loading:true}
        case GET_BY_SERVICE_SUCCESS:
            return {loading:false,services:action.payload}
        case GET_BY_SERVICE_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

const  searchReducers = (state={},action)=>{
    switch(action.type){
        case SEARCH_REQUEST:
            return {loading:true}
        case SEARCH_SUCCESS:
            return {loading:false,result:action.payload}
        case SEARCH_FAIL:
            return {loading:false,error:action.payload} 
        default:
            return state 
    }
}

export {getServicesReducer,getLocationsReducer,getSellerServingReducer,addServingReducer,
        deleteServingReducer,getOneServingReducer,updateServingReducer,getToTenReducer,getToFourReducer,
        getByServiceReducer,searchReducers}