import {GET_SELLER_ORDERS_FAIL,GET_SELLER_ORDERS_REQUEST,GET_SELLER_ORDERS_SUCCESS,
GET_CLIENT_ORDERS_FAIL,GET_CLIENT_ORDERS_REQUEST,GET_CLIENT_ORDERS_SUCCESS,
UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER,
ADD_ORDER,ADD_ORDER_FAIL,ADD_ORDER_REQUEST,ADD_ORDER_SUCCESS,
ADD_RATING_FAIL,ADD_RATING_REQUEST,ADD_RATING_SUCCESS} from '../Constants/ordersConstants'


const getSellerOrdersReducer = (state={},action)=>{
    switch(action.type){
        case GET_SELLER_ORDERS_REQUEST:
            return {ordersLoading:true}
        case GET_SELLER_ORDERS_SUCCESS:
            return {ordersLoading:false,orders:action.payload}
        case UPDATE_ORDER:
            const updatedOrders = state.orders
            updatedOrders.forEach(e => {
                if(e.id == action.payload[0]){
                    e.status = action.payload[1]
                }
            })
            console.log(action.payload)
            console.log(updatedOrders)
            return{orders:[...updatedOrders]}
        case GET_SELLER_ORDERS_FAIL:
            return {ordersLoading:false,ordersError:action.payload} 
        default:
            return state 
    }
}

const getClientOrdersReducer = (state={},action)=>{
    switch(action.type){
        case GET_CLIENT_ORDERS_REQUEST:
            return {ordersLoading:true}
        case GET_CLIENT_ORDERS_SUCCESS:
            return {ordersLoading:false,orders:action.payload}
        case GET_CLIENT_ORDERS_FAIL:
            return {ordersLoading:false,ordersError:action.payload} 
        default:
            return state 
    }
}

const updateOrdersReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_ORDER_REQUEST:
            return {updateOrderLoading:true}
        case UPDATE_ORDER_SUCCESS:
            return {updateOrderLoading:false,updatedOrder:action.payload}
       case UPDATE_ORDER_FAIL:
            return {updateOrderLoading:false,updateOrderError:action.payload} 
        default:
            return state 
    }
}

const addOrdersReducer = (state={},action)=>{
    switch(action.type){
        case ADD_ORDER_REQUEST:
            return {addOrderLoading:true}
        case ADD_ORDER_SUCCESS:
            return {addOrderLoading:false,addedOrder:action.payload}
       case ADD_ORDER_FAIL:
            return {addOrderLoading:false,addOrderError:action.payload} 
        default:
            return state 
    }
}

const addRatingsReducer = (state={},action)=>{
    switch(action.type){
        case ADD_RATING_REQUEST:
            return {addRatingLoading:true}
        case ADD_RATING_SUCCESS:
            return {addRatingLoading:false,addedRating:action.payload}
       case ADD_RATING_FAIL:
            return {addRatingLoading:false,addRatingError:action.payload} 
        default:
            return state 
    }
}

export {getSellerOrdersReducer,getClientOrdersReducer,updateOrdersReducer,addOrdersReducer,
        addRatingsReducer}