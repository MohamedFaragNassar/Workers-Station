import React, { useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import OrderImage from './OrderImage'
import {useClickToClose} from '../helpers/CTC'
import { useDispatch, useSelector } from 'react-redux'
import {addRating} from '../Actions/ordersActions'
import StarRating from './StarRating'
const OrderItem = ({order,id}) => {
    const [isOpen,setIsOpen] = useState(false)
    const {userData}  =  useSelector(state => state.userSignIn)
    const dispatch = useDispatch()
    const domNode = useClickToClose(()=>setIsOpen(false),"#order_image")

   

    const handleRating = (rating) =>{
        dispatch(addRating(order?.id,rating))
    } 

    return (
        <div  className="w-full h-48 flex items-start border-2 relative overflow-hidden rounded-lg p-2 mb-2 " >
            <div className="w-5/6  md:w-3/5 flex flex-col items-start justify-between h-full">
                <div className="w-full md:w-2/3 flex items-center justify-between text-sm md:text-l font-semibold">
                    <Link className="focus:outline-none" to={`/service/${order?.seller_id}/${order?.service}`}
                    className="w-full text-left break-all">ٍ{`${order?.service} by ${order?.first_name} ${order?.last_name}`}</Link >
                </div>
                <div className="w-4/5 md:w-1/2 flex items-start justify-between text-sm md:text-l font-semibold">
                    <span>Amount : </span>
                    <span className="w-1/2 text-left" >{`${order?.amount} hrs`}</span>
                </div>
                <div className="w-4/5 md:w-1/2 flex items-start justify-between text-sm md:text-l font-semibold">
                    <span>Total Price : </span>
                    <span className="w-1/2 text-left">{`$${order?.total_price}`}</span>
                </div>
                {order?.status=="finished"&&userData&&userData?.id==id&&<div className="w-1/3 " >
                   {<StarRating handler={handleRating} value={order?.rating[0]?.value || 0} />}
                </div>}
                <div className="w-3/5 lg:w-2/5 px-4 py-2 bg-yellow-200 rounded-lg flex items-center 
                justify-between text-sm md:text-l font-normal">
                    <i className="far fa-calendar-alt mr-2"></i>
                    <span>{moment(order?.starts_at).format('MMMM Do YYYY')}</span>
                </div>
            </div>
            <div className="w-20 h-20 p-2 rounded-md bg-green-400 absolute -top-6 re-position   flex items-end justify-center" > 
                <span>{order?.status}</span>
            </div>
            {order?.image&&<div className="absolute top-36  flex items-end re-position" >
               <button className="focus:outline-none" onClick={()=>setIsOpen(true)}>Attached Image</button>
            </div>}
            <img className="w-2/5 h-full hidden md:block" alt='service image'
            src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929
            /services/${order?.seller_id}_${order?.service.replace(/\s/g, '')}`} />
            <OrderImage isOpen={isOpen} domNode={domNode} 
            image={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621062688/${order?.image}.jpg`} />
        </div>
    )
}

export default OrderItem
