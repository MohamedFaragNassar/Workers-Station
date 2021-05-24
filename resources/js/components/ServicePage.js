import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceCard from './ServiceCard'
import {getByService} from '../Actions/servicesActions'
import Spinner from './Spinner'
import Status from './Status'
const ServicePage = (props) => {
    const dispatch = useDispatch()
    const srv = props.match.params.service
    const {loading,error,services} = useSelector(state => state.getByService)
    useEffect(() => {
       dispatch(getByService(srv))
    }, [srv])
   console.log(services)
   return <>
        <div className="w-full mb-5 min-h-screen">
            <div className="w-full h-12 text-white flex items-center justify-between rounded-lg shadow-md"
            style={{background:"#28abb9"}}>
                <span className="ml-10 font-bold text-xl" >{srv}</span>
           </div>
            { loading?<Spinner /> :error? <Status status="fail" message={error} /> :null}
            <div className="flex items-center justify-start gap-4 flex-wrap">
                {services?.map(service => 
                    <ServiceCard service={service} />    
                )}
            </div>
        </div>
    </>
}

export default ServicePage
