import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Profile from './Profile'
import ServiceItem from './ServiceItem'
import AddService from './AddService'
import {getSellerServing} from '../Actions/servicesActions'
import {getSellerOrders} from '../Actions/ordersActions'
import {getProfile} from '../Actions/userActions'
import Status from './Status'
import Spinner from './Spinner'
import SellerOrderItem from './SellerOrderItem'
const Seller = (props) => {
    
    const [height,setHeight] = useState(41)
    const [servicesHeight,setServicesHeight] = useState(41)
    const [isOpen,setIsOpen] = useState(false)
    const {userData}  =  useSelector(state => state.userSignIn)
    const {addServingLoading,AddServingError,addServing}  =  useSelector(state => state.addServing)
    const {deleteServingLoading,deleteServingError,deleteServing} = useSelector(state => state.deleteServing)
    const {updateServingLoading,updateServingError,updateServing} = useSelector(state => state.updateServing)
    const {ordersLoading,ordersError,orders} = useSelector(state => state.sellerOrders)

    const dispatch = useDispatch()
    const id = props.match.params.id;
    
    const {servings} = useSelector(state => state.sellerSeving)
    const {loading,error,profile} = useSelector(state => state.getProfile)

    useEffect(() => {
        dispatch(getSellerServing(id))
        dispatch(getSellerOrders(id))
        dispatch(getProfile(id,"seller"))
    }, [id])
   
    return <>

        {loading?<div className="w-full flex items-center justify-center mt-24" ><Spinner /> </div>:
        error ? <div className="w-full flex items-center justify-center mt-24" >
            <Status message={error.message} /> 
            </div>: profile ?
            <div className="min-h-screen flex flex-col lg:flex-row items-start justify-between">
           {profile&& <Profile profile={profile.seller} type="seller" />}
            <div className=" w-full lg:w-2/3 flex flex-col items-center mt-20" >
                <div className="w-full ml-2 mb-2 bg-white shadow-lg rounded-lg  overflow-y-auto relative anim" style={{height:height+"vh"}} >
                    {ordersLoading&&<Spinner />}
                    {ordersError&&<Status message={ordersError} status="fail" />}
                    <div className="w-full px-10 py-2 border-b-2 flex items-center justify-between ">
                        <h1 className="font-bold text-xl">Orders</h1>
                    </div>
                    <div className="p-2">
                    {orders&&orders.map(order => 
                            <SellerOrderItem order={order} />
                        )}
                    </div>
                    <div className="w-full h-10 sticky  bottom-0 flex items-center justify-center bg-white hover:bg-gray-100" >
                        <button className="focus:outline-none"  onClick={ height==41? ()=>setHeight(83):()=>setHeight(41)} >
                        {height==41?<span>Expand <i className="ml-2 fas fa-arrow-circle-down"></i></span>
                        :<span>Shrink <i className="ml-2 fas fa-arrow-circle-up"></i></span>}</button>
                    </div>
                </div>
                <div className="w-full ml-2 bg-white shadow-lg rounded-lg  overflow-y-auto relative anim" style={{height:servicesHeight+"vh"}} >
                    {addServingLoading || deleteServingLoading || updateServingLoading ?<Spinner/>:null}
                    {AddServingError?<Status status="fail" message={AddServingError} />:null}
                    {deleteServingError?<Status status="fail" message={deleteServingError} />:null}
                    {updateServingError?<Status status="fail" message={updateServingError} />:null}
                    {addServing?<Status status="success" message={"New Service Added Successfully"} />:null}
                    {deleteServing?<Status status="success" message={"Service has been deleted Successfully"} />:null}
                    {updateServing?<Status status="success" message={"Service has been Updated Successfully"} />:null}
                    <div className="w-full px-10 py-2 border-b-2 flex items-center justify-between ">
                        <h1 className="font-bold text-xl">Services</h1>
                        {userData&&userData.id==id&&<button onClick={()=>setIsOpen(true)}
                        className=" px-2 py-1 md:px-10 md:py-2 bg-gray-600 text-white text-lg rounded-lg">
                            Add Service
                        </button>}
                    </div>
                    <div className="p-2">
                    {servings&&servings.map(ser => 
                            <ServiceItem key={ser} service={ser} />
                        )}
                    </div>
                    <div className="w-full h-10 sticky  bottom-0 flex items-center justify-center bg-white hover:bg-gray-100" >
                        <button className="focus:outline-none" onClick={ servicesHeight==41? ()=>setServicesHeight(83):()=>setServicesHeight(41)} >
                        {servicesHeight==41?<span>Expand <i className="ml-2 fas fa-arrow-circle-down"></i></span>:
                        <span>Shrink <i className="ml-2 fas fa-arrow-circle-up"></i></span>}</button>
                    </div>
                </div>
            </div>
            {userData&&<AddService isOpen={isOpen} close={()=>setIsOpen(false)} seller_id={userData.id} />}
        </div> : null}
    </>
}

export default Seller
