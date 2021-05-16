import React, { useEffect, useState } from 'react'
import {getProfile} from '../Actions/userActions'
import {getClientOrders} from '../Actions/ordersActions'
import {useDispatch, useSelector} from 'react-redux'
import Profile from './Profile'
import OrderItem from './OrderItem'
import Spinner from './Spinner'
import Status from './Status'

const Cleint = (props) => {
    const id = props.match.params.id;
    const {profile} = useSelector(state => state.getProfile)
    const {loading,error,orders} = useSelector(state => state.clientOrders)
    const {addRatingLoading,addRatingError,addedRating} = useSelector(state => state.rating)
   
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProfile(id,"client"))
        dispatch(getClientOrders(id))
    }, [])
    
    return <>
        {loading ? <Spinner /> : error ? <Status status="fail" message={error} /> : orders ?
        <div className=" md:min-h-screen flex flex-col items-center lg:flex-row  lg:items-start lg:justify-between">
            {profile&&<Profile profile={profile} type="client" />}
            <div className="w-full  lg:w-2/3 ml-2 bg-white shadow-lg rounded-lg h-5/6 mt-8 lg:mt-20 lg:overflow-y-auto" >
                {addRatingLoading&&<Spinner/>}
                {addRatingError&&<Status status="fail" message="somthing went wring when trying to send your rating" />}
                {addedRating=="ok"&&<Status status="success" message="Your Rating has been sent successfully" />}
                <div className="w-full px-10 py-5 border-b-2 flex items-center justify-between ">
                    <h1 className="font-bold text-xl">Orders</h1>
                </div>
                <div className="p-2">
                    {orders.map(order => 
                        <OrderItem order={order} id={id} />    
                    )}
                </div>
            </div>
            
        </div>:null}
    </>
}

export default Cleint
