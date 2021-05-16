import React, { useEffect } from 'react'
import ServiceCard from './ServiceCard'
import {getTopFour} from '../Actions/servicesActions'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import Status from './Status'
const TopRatedService = ({service}) => {
    const dispatch = useDispatch()
    const {loading,error,data} = useSelector(state => state.topFour)
    useEffect(() => {
        dispatch(getTopFour(service))
    }, [])

    console.log(data)
    
    return <>
       {loading?<Spinner/> :error?<Status status="fail" message={error}/>:data?
        <div className="w-full">
        <div className="w-full h-12 text-white flex items-center justify-between rounded-lg shadow-md "
            style={{background:"#28abb9"}}>
                        <span className="ml-10 font-bold text-xl" >{service}</span>
                        <span className="mr-10">Top Rated Sellers</span>
            </div>
            <div className="flex items-center justify-between px-5">
                {data.map(ser => 
                    <ServiceCard service={ser} />     
                )}
            </div>
       </div>:null}
    </>
}

export default TopRatedService
