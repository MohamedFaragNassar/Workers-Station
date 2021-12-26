import React from 'react'
import { Link } from 'react-router-dom'
import Review from './Review'

const Highlight = ({service}) => {
    
    return <>
        {service&&<div className="w-full mx-auto h-80 flex items-center mb-5 shadow-lg rounded-lg">
            <div className="h-full  slider-content rounded-l-lg pl-14 flex flex-col items-start p-4">
                <Link className="text-xl  max-h-20 tur font-semibold mb-2 w-full text-left text-green-800 focus:outline-none" 
                to={`/service/${service.seller_id}/${service.service}`}>
                    {`${service.service} By ${service.first_name} ${service.last_name}`}
                </Link>
                <div className="text-left mb-2 text-base w-full h-20  font-medium lg:mb-5  break-words">
                    {service.snippet}
                </div>
                <div className="text-xl mb-5">
                    <i className="fas fa-compass"></i>
                    <span className="ml-4" >{service.location}</span>
                </div>
                <div className=" text-xl mb-4">
                    <i className="fas fa-coins"></i>
                    <span className="ml-4">{`${service.price} $/hr`}</span>
                </div>
                <Review color="#11698e" size={25} value={service.val} />
            </div>
            <div className=" h-full slider-img rounded-r-lg " 
            style={{backgroundImage: `url("https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929/services/${service.seller_id}_${service.service.replace(/\s/g, '')}.jpg")`}} >
            </div>
        </div>}
    </>
}

export default Highlight
