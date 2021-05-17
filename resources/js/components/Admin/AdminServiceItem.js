import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {deleteService} from '../../Actions/AdminActions'
import Confirm from './Confirm'
const AdminServiceItem = ({service}) => {

    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
    
    const handleDelService = () => {
        dispatch(deleteService(service[0].name))
        setIsOpen(false)
    }

    return <>
        <div className="w-full p-2 h-14 border rounded-sm mt-2 flex items-center justify-between">
            <span className="w-1/4">{service[0].name}</span>
            <span>{service[1]}</span>
            <div>
                {service.status=="pending"&&<button>Accept</button>}
                {service.status=="pending"&&<button>Reject</button>}
                <button onClick={()=>setIsOpen(true)}><i className="fas fa-trash-alt hover:text-gray-500"></i></button>
            </div>
        </div>
        {isOpen&&<Confirm header="Deleting Service" message= {`Are you sure you want to delete ${service[0].name}`}
        handler={()=>handleDelService()} close={()=>setIsOpen(false)} />}
    </>
}

export default AdminServiceItem
