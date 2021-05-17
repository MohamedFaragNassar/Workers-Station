import thunk from 'redux-thunk'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {loginReducer,registerReducer,profileReducer,updateProfileReducer,sendActivationReducer,
         updatePersonalImageReducer,deleteAccountReducer} from './Reducers/usersReducers'
import {getLocationsReducer,getServicesReducer,getSellerServingReducer,addServingReducer,
         deleteServingReducer,getOneServingReducer,updateServingReducer,getToTenReducer,
         getByServiceReducer,getToFourReducer,searchReducers} from './Reducers/servicesReducer'
import {getSellerOrdersReducer,getClientOrdersReducer, addOrdersReducer,updateOrdersReducer
      ,addRatingsReducer} from './Reducers/ordersReducers'
import {adminLoginReducer,adminGetUsers,adminGetLocations,adminGetServices} from './Reducers/AdminReducer'


const initialState = {}

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
   deleteAccount:deleteAccountReducer,
   getUsers:adminGetUsers,
   adminServices:adminGetServices,
   adminLocations:adminGetLocations,
})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

export default store;