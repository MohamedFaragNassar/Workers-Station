import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {deleteService} from '../Actions/servicesActions'


const ServiceItemMenu = ({node,id,service,close,openEdit}) => {
    
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
   
    const handleOpenEdit = ()=>{
        openEdit()
        close()
    }
    const handleDeleteService = () =>{
        dispatch(deleteService(id,service))
        close()
    }

    return <>
        <div ref={node} id="simenu" className="w-40 shadow-md rounded-sm flex flex-col items-center absolute top-2 right-2 bg-white px-2 z-10 pt-2 pb-2">
            <button onClick={()=>handleOpenEdit()} id="simenubtn" 
            className="px-2 py-2 w-full flex items-center hover:bg-gray-200">
                <i className="fas fa-edit"></i>
                <span className="ml-2">Edit Service</span>
            </button>
            <button onClick={()=>handleDeleteService()} id="simenubtn" 
            className="px-2 py-2 w-full flex items-center hover:bg-gray-200">
                <i className="fas fa-trash-alt"></i>
                <span className="ml-2">Delete Service</span>
            </button>
        </div>
     </>
}

export default ServiceItemMenu
