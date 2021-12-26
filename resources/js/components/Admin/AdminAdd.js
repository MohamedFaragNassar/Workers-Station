import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {addLocation, addService} from "../../Actions/AdminActions"

const AdminAdd = ({close,type}) => {
    const [name,setName] = useState()
    const dispatch = useDispatch()
    
    const handleAdd = (e) => {
        e.preventDefault()
        if(type=="service"){
            dispatch(addService(name))
        }else{
            dispatch(addLocation(name))
        }
        close()
    }
   
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <form id="edit-profile"  className="w-5/6 lg:w-2/5 center1 fixed  top-8 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg focus:outline-none" onClick={close}>
                        <i className="fal fa-times-circle"></i>
                    </button>
                    <h1 className="font-bold text-xl">{type=="service"?"Add Service":"Add Location"}</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >{type=="service"?"Service Name":"Location Name"}</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none"
                      onChange={(e)=>setName(e.target.value)} required="true" />
                </div>
               <button type="submit" onClick={(e)=>handleAdd(e)}
                className="px-4 py-2 mt-2 bg-gray-600 focus:outline-none
                text-white rounded-md hover:bg-gray-500" disabled={name==null} >
                    {type=="service"?"Add Service":"Add Location"}
                </button>
                
            </div>
        </form>
    </>
}

export default AdminAdd
