import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getServices} from '../../Actions/servicesActions'
import AdminServiceItem from './AdminServiceItem'
const AdminServices = () => {
    
    const {services} = useSelector(state => state.getServices)
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getServices())
    }, [])
    
    return <>
        <div className="w-full bg-white shadow-sm rounded-sm p-4 overflow-y-auto" style={{height:95+"vh"}}>
            <div  className="w-full  flex items-center justify-between">
                <span className="mt-4 mb-4 font-bold ">All Available Services</span>
                <button>Add Service</button>
            </div>
            <div>
                {services&&services.map(service => 
                    <AdminServiceItem service={service} />    
                )}
            </div>

        </div>
    </>
}

export default AdminServices
