import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getLocations} from '../../Actions/servicesActions'
import AdminLocationItem from './AdminLocationItem'

const AdminLocations = () => {

    const dispatch = useDispatch()
    const {locations} = useSelector(state => state.getLocations)
    
    useEffect(() => {
       dispatch(getLocations())
    }, [])

    return <>
        <div className="w-full bg-white shadow-sm rounded-sm p-4 overflow-y-auto" style={{height:95+"vh"}}>
            <div  className="w-full  flex items-center justify-between">
                <span className="mt-4 mb-4 font-bold ">All Available Locations</span>
                <button>Add Location</button>
            </div>
            <div>
                {locations&&locations.map(loc => 
                    <AdminLocationItem location={loc} />    
                )}
                    
            </div>

        </div>
    </>
}

export default AdminLocations
