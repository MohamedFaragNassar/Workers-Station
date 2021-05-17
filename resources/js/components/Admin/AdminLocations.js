import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import {getLocations} from '../../Actions/servicesActions'
import {getLocations} from '../../Actions/AdminActions'
import AdminAdd from './AdminAdd'
import AdminLocationItem from './AdminLocationItem'

const AdminLocations = () => {
    const [isOpen,setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const {locations} = useSelector(state => state.adminLocations)
    
    useEffect(() => {
       dispatch(getLocations())
    }, [])

    return <>
       <div className="w-full bg-white shadow-sm rounded-sm p-4 overflow-y-auto" style={{height:95+"vh"}}>
            <div  className="w-full  flex items-center justify-between">
                <span className="mt-4 mb-4 font-bold ">All Available Locations</span>
                <button className="focus:outline-none" onClick={()=>setIsOpen(true)}>Add Location</button>
            </div>
            <div>
                <div className="w-full border-b pb-4 flex items-center justify-between">
                    <span className="w-1/4">Location Name</span>
                    <span>Available Sellers</span>
                    <span></span>
                </div>
                {locations&&locations.map(loc => 
                    <AdminLocationItem location={loc} key={loc[0].name} />    
                )}
                    
            </div>

        </div>
        {isOpen&&<AdminAdd close={()=>setIsOpen(false)} type="location" />} 

    </>
}

export default AdminLocations
