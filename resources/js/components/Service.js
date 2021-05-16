import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Review from './Review'
import {getOneServing} from '../Actions/servicesActions'
import {getProfile} from '../Actions/userActions'
import {getClientOrders} from '../Actions/ordersActions'
import Spinner from './Spinner'
import Status from './Status'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddOrder from './AddOrder'

const Service = (props) => {
    
    const [isOpen,setIsOpen] = useState(false)
    const [rating,setRating] = useState(0)
    const {id,service} = props.match.params;
    const dispatch = useDispatch()
    const {loading,error,serving} = useSelector(state => state.getServing)
    const {addOrderLoading,addOrderError,addedOrder} = useSelector(state => state.addOrder)
    const {profile} = useSelector(state => state.getProfile)
    const {orders} = useSelector(state => state.clientOrders)

   
    const type = localStorage.getItem("type")
    const {userData}  =  useSelector(state => state.userSignIn)
    
    let checkOrders
    if(orders){
        checkOrders = orders.filter(e => e.seller_id == id && e.service == service).length > 0
    }

    const getRating = () => {
        const total = serving.rating[0]/serving.rating[1];
        if(total){
            return total
        }else{
            return 0
        }
    }
    const getSellerRating = () => {
        const total = profile?.rating[0]/profile?.rating[1];
        if(total){
            return total
        }else{
            return 0
        }
    }

    useEffect(() => {
        dispatch(getOneServing(id,service))
        dispatch(getProfile(id,"seller"))
        dispatch(getClientOrders(userData?.id))
    }, [])

    return <>
        {loading?<Spinner/>:error?<div className="w-full pt-16" ><Status/></div>:serving&&profile?
        <div className="w-full shadow-lg rounded-lg p-5 bg-white mt-16 change-height ">
            {addOrderLoading&& <Spinner/>}
            {addOrderError&&<Status message={addOrderError.message} status="fail" />}
            {addedOrder&&<Status message={"The order is sent successfully"}  status="success"/>}
            <div className="text-xl font-bold mb-10" >{`${serving.offer.service} By ${profile.seller.first_name} ${profile.seller.last_name}`}</div>
            <div className="h-5/6 flex flex-col-reverse lg:flex-row items-center mt-6 lg:mt-0">
                <div className=" w-full mt:4 lg:mt-0 border rounded-md lg:border-none p-2  md:w-3/4 lg:w-1/3 
                 h-full flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <img className="w-20 h-20 rounded-full" 
                        src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621061309/profiles/sellers/${profile.seller.id}.jpg`} />
                        <Link to={`/seller/${id}`} className="text-xl font-semibold mt-2">
                            {`${profile.seller.first_name} ${profile.seller.last_name}`}
                        </Link>
                    </div>
                    <div className="w-full lg:w-2/3 mx-auto flex items-center flex-col mt-4 mb-8">
                        <div className="w-3/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                            <i className="fas fa-compass"></i>
                            <span className="w-10/12 text-left ml-2" >{profile.seller.location}</span>
                        </div>
                        <div className="w-3/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                            <i className="fas fa-clock"></i>
                            <span className="w-10/12 text-left" >{profile.seller.daily_start}</span>
                        </div>
                        <div className="w-3/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                            <i className="far fa-clock"></i>
                            <span className="w-10/12 text-left" >{profile.seller.daily_end}</span>
                        </div>
                        <div className="w-2/3 mx-auto flex items-center flex-col mt-8 mb-10">
                                <Review value={getSellerRating()} color="yellow" size={30} />
                                <span className="mt-3">{`( ${profile.rating[1]} Reviews )`}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 lg:border-l-2 h-full flex flex-col items-start justify-between">
                   <div className="flex items-start w-11/12 mx-auto">
                        <div className="w-full lg:w-1/2 flex  max-h-80 flex-col lg:mr-5 items-start">
                            <span className="text-xl font-bold mb-2">Details :</span>
                            <div className="text-left text-base lg:text-lg">{serving.offer.details}</div>
                        </div>
                        <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929/services/${id}_${service}.jpg`} 
                        className="w-1/2 mx-auto h-80 rounded-lg hidden lg:block"/>
                   </div>
                   <div className="flex w-full flex-col lg:flex-row items-center justify-between  mt-4 lg:mt-0">
                            <div className="flex flex-col items-center lg:flex-row  lg:items-center">
                                <div className="flex items-center flex-col mb-5 lg:ml-10">
                                    <Review value={getRating() } color={"yellow"} size={35} /> 
                                    <span className="mt-2">{`( ${serving.rating[1]} Reviews )`}</span>
                                </div>
                                <div className=" text-xl p-2 rounded-lg bg-green-500 text-white lg:ml-10  mb-5">
                                    <i className="fas fa-coins"></i>
                                    <span className="ml-4">{`${serving.offer.price} $/hr`}</span>
                                </div>
                            </div>
                       {userData&&type=="client"&&<div className="flex items-center justify-center"><button className="px-8 py-2 rounded-lg lg:mr-10 mb-5 
                       focus:outline-none text-white font-bold text-xl" 
                       style={{background:'#11698E'}} onClick={()=>setIsOpen(true)} >Order Now</button></div>}
                    </div>
                    {/* {checkOrders&&<div className="w-3/5 mx-auto flex items-center justify-between">
                        <div className="w-3/4 relative  mb-4 mx-auto" >
                            <span className="absolute top-2 left-4">Rate This Product</span>
                            <select onChange={(e)=>setRating(Number(e.target.value))} className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <button className="p-2 bg-gray-600 rounded-lg mb-4  text-white font-semi text-lg">Add Review</button>
                    </div>} */}
                </div>
            </div>
            {serving&&profile&&<AddOrder service={serving.offer} isOpen={isOpen} 
            close={()=>setIsOpen(false)} seller={profile.seller} close={()=>setIsOpen(false)}/>}
        </div>:<div className="w-full mt-20 min-h-screen"><Status status="fail" message="Sorry This Service is not availabe now" /></div>}
    </>
}

export default Service
