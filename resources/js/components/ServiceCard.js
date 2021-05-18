import React from 'react'
import Review from './Review'
import {Link} from 'react-router-dom'
const ServiceCard = ({service}) => {
    
    return <>
        <div className="w-64 mt-5 border rounded-lg shadow-md bg-white  flex flex-col items-center justify-between" style={{height:450+"px"}} >
            <Link to={`/service/${service.id}/${service.service}`} className="font-semibold text-2xl mb-2 " >{service.service}</Link>
            <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621059929/services/${service.id}_${service.service}.jpg`} 
            className="w-11/12 h-2/5 max-h-2/5 rounded-sm mx-auto"/>
            <div className="text-left p-2 max-h-24 ">{service.snippet}</div>
            <div className="flex justify-between items-center border-t-2 p-2 w-full">
                <div className="flex flex-col items-start justify-between h-32 w-3/5">
                    <span className="p-2 rounded-lg bg-green-200 w-10/12 text-center" >
                        City 1, Cairo
                    </span>
                    <span className="px-4 py-2 rounded-lg bg-red-200 w-10/12 text-center ">
                        {`${service.price.toFixed(2)} $/hr`}
                    </span>
                    <Review value={service.sum/service.al}color={"yellow"} />
                </div>
                <Link to={`/seller/${service.id}`} className="flex flex-col items-center justify-center w-2/5 border-2 rounded-lg p-2 h-full" >
                    <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621061309/profiles/sellers/${service.id}.jpg`} 
                    className="w-14 h-14 rounded-full" />
                    <span>{`${service.first_name} ${service.last_name}`}</span>
                </Link>
            </div>
        </div>
    </>
}

export default ServiceCard
