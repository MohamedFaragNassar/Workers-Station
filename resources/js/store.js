import thunk from 'redux-thunk'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {loginReducer,registerReducer,profileReducer,updateProfileReducer,sendActivationReducer,
         updatePersonalImageReducer,deleteAccountReducer} from './Reducers/usersReducers'
import {getLocationsReducer,getServicesReducer,getSellerServingReducer,addServingReducer,
         deleteServingReducer,getOneServingReducer,updateServingReducer,getToTenReducer,
         getByServiceReducer,getToFourReducer,searchReducers} from './Reducers/servicesReducer'
import {getSellerOrdersReducer,getClientOrdersReducer, addOrdersReducer,updateOrdersReducer
      ,addRatingsReducer} from './Reducers/ordersReducers'
import {adminLoginReducer} from './Reducers/AdminReducer'

const userData = localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):null
const adminData = localStorage.getItem("adminData")?JSON.parse(localStorage.getItem("adminData")):null

const initialState = {userSignIn:{userData},admin:{adminData}}

const reducer = combineReducers({
   userSignIn: loginReducer,
   registerUser: registerReducer,
   getProfile: profileReducer,
   updateProfile: updateProfileReducer,
   activateCode: sendActivationReducer,
   getLocations: getLocationsReducer,
   getServices: getServicesReducer,
   personalImage : updatePersonalImageReducer,
   sellerSeving: getSellerServingReducer,
   addServing: addServingReducer,
   deleteServing: deleteServingReducer,
   getServing: getOneServingReducer,
   updateServing: updateServingReducer,
   topTen : getToTenReducer,
   topFour : getToFourReducer,
   getByService: getByServiceReducer,
   sellerOrders: getSellerOrdersReducer,
   clientOrders: getClientOrdersReducer,
   updateOrder: updateOrdersReducer,
   addOrder: addOrdersReducer,
   admin: adminLoginReducer,
   rating: addRatingsReducer,
   search: searchReducers,
   deleteAccount:deleteAccountReducer
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store;