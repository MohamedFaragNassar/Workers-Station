import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addService,getServices } from '../../Actions/AdminActions'
//import {getServices,} from '../../Actions/servicesActions'
import AdminAdd from './AdminAdd'
import AdminServiceItem from './AdminServiceItem'
const AdminServices = () => {
    const [isOpen,setIsOpen] = useState(false)

    const {services} = useSelector(state => state.adminServices)
    const dispatch = useDispatch()
   console.log(services)
    useEffect(() => {
       dispatch(getServices())
    }, [])
    
    return <>
        <div className="w-full bg-white shadow-sm rounded-sm p-4 overflow-y-auto" style={{height:95+"vh"}}>
            <div  className="w-full  flex items-center justify-between">
                <span className="mt-4 mb-4 font-bold ">All Available Services</span>
                <button className="focus:outline-none" onClick={()=>setIsOpen(true)}>Add Service</button>
            </div>
            <div>
            <div className="w-full border-b pb-4 flex items-center justify-between">
                    <span className="w-1/4">Service Name</span>
                    <span>Available Offers</span>
                    <span></span>
                </div>
                {services&&services.map(service => 
                    <AdminServiceItem service={service} key={service[0].name} />    
                )}
            </div>

        </div>
        {isOpen&&<AdminAdd close={()=>setIsOpen(false)} type="service" />} 
    </>
}

export default AdminServices
