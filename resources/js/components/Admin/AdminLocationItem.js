import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {deleteLocation} from '../../Actions/AdminActions'
import Confirm from './Confirm'

const AdminLocationItem = ({location}) => {
    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
    
    const handleDelLocation = () => {
        dispatch(deleteLocation(location[0]?.name))
        setIsOpen(false)
    }
    return <>
        <div className="w-full p-2 h-14 border rounded-sm mt-4 flex items-center justify-between">
            <span className="w-1/4">{location[0].name}</span>
            <span>{location[1]}</span>
            <div>
                {location.status=="pending"&&<button>Accept</button>}
                {location.status=="pending"&&<button>Reject</button>}
                <button className={"focus:outline-none"} onClick={()=>setIsOpen(true)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        {isOpen&&<Confirm header="Deleting Service" message= {`Are you sure you want to delete ${location.name}`}
        handler={()=>handleDelLocation()} close={()=>setIsOpen(false)} />}
    </>
}

export default AdminLocationItem
