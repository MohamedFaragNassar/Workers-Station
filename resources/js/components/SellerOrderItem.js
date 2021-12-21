import React,{useState} from 'react'
import moment from 'moment'
import OrderImage from './OrderImage'
import {useClickToClose} from '../helpers/CTC'
import { useSelector } from 'react-redux'
import OrderItemMenu from './OrderItemMenu'

const OrderItem = ({order}) => {
    
    const [isOpen,setIsOpen] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const domNode = useClickToClose(()=>setIsOpen(false),"#order_image")
    const {userData}  =  useSelector(state => state.userSignIn)
    const menuNode = useClickToClose(()=>setIsMenuOpen(false),"#simenu")

  
    return (
        <div  className="w-full  h-48 flex items-start border-2 rounded-lg p-2 mb-2 relative overflow-hidden hts " >
             {userData?.id==order?.seller_id && order?.status != "finished" && <button className="w-10 h-10 rounded-full bg-white 
                absolute  top-0 right-0 hidden focus:outline-none" 
             onClick={()=>setIsMenuOpen(true)}>
                <i className="fas fa-ellipsis-v"></i>
            </button>}
            <div className="w-5/6  md:w-3/5 flex flex-col items-start justify-between h-full">
                <div className="w-2/3 flex items-center justify-between text-xl font-semibold mb-2">
                    <span className="w-3/4 text-left">ٍ{`${order?.service}`}</span>
                </div>
                <div className="w-4/5 md:w-1/2 flex items-start justify-between text-sm md:text-l font-semibold">
                    <span>Amount : </span>
                    <span className="w-1/2 text-left" >{`${order?.amount} hrs`} </span>
                </div>
                <div className="w-4/5 md:w-1/2 flex items-start justify-between text-sm md:text-l font-semibold">
                    <span>Total Price : </span>
                    <span className="w-1/2 text-left">{`$${order?.total_price}`}</span>
                </div>
                <div className="w-2/3 md:w-1/2 lg:w-3/5 px-4 py-2 bg-yellow-200 rounded-lg flex items-center 
                    justify-between text-sm md:text-l font-normal">
                    <i className="far fa-calendar-alt"></i>
                    <span>{moment(order?.starts_at).format('MMMM Do YYYY')}</span>
                </div>
            </div>
            <div className="w-20 h-20 p-2 rounded-md bg-green-400 absolute -top-6  flex items-end justify-center" 
            style={window.screen.width > 400 ?{left:42+"%"} : {right:2+"%"}}>
               <span>{order?.status}</span>
            </div>
            {order?.image&&<div className="absolute top-32  flex items-end" 
            style={window.screen.width > 400 ?{left:42+"%"} : {right:2+"%"}}>
               <button onClick={()=>setIsOpen(true)}>Attached Image</button>
            </div>}
            <img className="hidden md:block w-2/5 h-full" 
            src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929/services/${userData?.id}_${order?.service.replace(/\s/g, '')}`} />
            <OrderImage isOpen={isOpen} domNode={domNode}
             image={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621062688/${order?.image}`}/>
            <OrderItemMenu order={order} isOpen={isMenuOpen} node={menuNode} close={()=>setIsMenuOpen(false)} />
        </div>
    )
}

export default OrderItem
