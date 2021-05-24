import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ServiceItemMenu from './ServiceItemMenu'
import {useClickToClose} from '../helpers/CTC'
import UpdateService from './UpdateService'
import { Link } from 'react-router-dom'

const ServiceItem = ({service}) => {

    const [isOpen,setIsOpen] = useState(false)
    const [isUpdateOpen,setIsUpdateOpen] = useState(false)
    const domeNode = useClickToClose(()=>setIsOpen(false),"#simenu")
    const {userData}  =  useSelector(state => state.userSignIn)
    
    const clacDiscount = (price,discount) =>{
        return price - ((discount/100)*price)
    }
    
    return (
        <div className="w-full h-44  flex items-start border-2 rounded-lg p-2 mb-2 hts relative">
           {userData?.id==service?.seller_id&& <button className="w-10 h-10 rounded-full
            bg-white absolute top-0 right-0 hidden focus:outline-none" 
           onClick={()=>setIsOpen(true)} >
                <i className="fas fa-ellipsis-v"></i>
            </button>}
            <div className="w-full md:w-3/5 flex flex-col items-start justify-start h-full">
                <Link to={`/service/${service?.seller_id}/${service?.service}`} className="font-bold text-2xl mb-2 " >
                    {service?.service}
                </Link>
                <div className="text-left mb-.5 lg:mb-2">{service?.snippet}</div>
                
                <div className="w-full flex items-center justify-between md:justify-start mr-1 md:mr-2 mt-auto">
                    {service?.discount > 0 && <div className="text-sm font-normal px-2 py-2 md:px-2 md:mr-2 md:text-lg md:font-medium 
                        flex items-center justify-center rounded-lg bg-red-200 ">
                        <span className="line-through mr-0.5 md:mr-2" >{`${service?.price} $/hr`}</span>
                        <span>{`${service?.discount}% discount`}</span>
                    </div>}
                    <span className=" text-sm font-normal px-2 py-2 md:px-2 md:py-2 mt-auto md:font-medium rounded-lg md:text-lg 
                        bg-green-400 text-white text-center ">
                            <i className=" mr-2 fas fa-coins"></i>
                            {`${service?.discount > 0 ? clacDiscount(service?.price,service?.discount).toFixed(2):service?.price} $/hr`}
                    </span>
                </div>
                
            </div>
            <img className="hidden md:block max-w-2/5 h-40"
             src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929/services/${service?.seller_id}_${service?.service.replace(" ","")}`} />
            {isOpen && <ServiceItemMenu node={domeNode} id={service?.seller_id} service={service?.service} openEdit={()=>setIsUpdateOpen(true)} close={()=>setIsOpen(false)} /> }
            {userData?.id==service?.seller_id&&isUpdateOpen&&<UpdateService service={service} isOpen={isUpdateOpen} close={()=>setIsUpdateOpen(false)} />}
        </div>
    )
}

export default ServiceItem
