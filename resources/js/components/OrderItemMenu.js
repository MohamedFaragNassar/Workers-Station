import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {updateOrder} from '../Actions/ordersActions'


const OrderItemMenu = ({node,id,order,isOpen,close}) => {
    
    const dispatch = useDispatch()
    
    const handleOpenEdit = ()=>{
        
        close()
    }
   
    const handleUpdateOrder = (status) =>{
        dispatch(updateOrder(order.id,status))
        close()
    }

    if(!isOpen){
        return null
    }
    return <>
        <div ref={node} id="simenu" className="w-40 shadow-md rounded-sm flex flex-col items-center 
            absolute top-2 right-2 bg-white px-2 z-10 pt-2 pb-2">
            {order.status=="pending"?<>
                <button onClick={()=>handleUpdateOrder("accepted")} id="simenubtn" 
                className="px-2 py-2 w-full flex items-center hover:bg-gray-200">
                    <i className=" fas fa-check-circle"></i>
                    <span className="ml-2">Accept</span>
                </button>
                <button onClick={()=>handleUpdateOrder("rejected")} id="simenubtn" 
                className="px-2 py-2 w-full flex items-center hover:bg-gray-200">
                    <i className="fas fa-times-circle"></i>
                    <span className="ml-2">Reject</span>
                </button>
            </>:order.status=="accepted"?
            <button onClick={()=>handleUpdateOrder("finished")} id="simenubtn" 
            className="px-2 py-2 w-full flex items-center hover:bg-gray-200">
                <i className="fas fa-edit"></i>
                <span className="ml-2">Mark as finished</span>
            </button>:null}
        </div>
     </>
}

export default OrderItemMenu
