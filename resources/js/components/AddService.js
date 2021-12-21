import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {getLocations,getServices,addServing} from "../Actions/servicesActions"

const AddService = ({isOpen,close,seller_id}) => {

   
    const [price,setPrice] = useState() 
    const [service,setService] = useState() 
    const [details,setDetails] = useState() 
    const [snippet,setSnippet] = useState() 
    const [discount,setDiscount] = useState(0) 
    const [image,setImage] = useState() 
    
    const {services} = useSelector(state => state.getServices)
    const {locations} = useSelector(state => state.getLocations)
    
    const history = useHistory()

    const dispatch = useDispatch()

    const handleAddService = (e)=>{
        e.preventDefault()
        dispatch(addServing(service,seller_id,price,snippet,details,discount,image))
        close();
    }

    const getImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
    }

    useEffect(() => {
        dispatch(getLocations())
        dispatch(getServices())
    }, [])
    
    
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <form id="edit-profile"  className="w-5/6  lg:w-2/5 fixed lg:left-1/3 top-8 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg focus:outline-none" onClick={close}>
                        <i className="fal fa-times-circle"></i>
                    </button>
                    <h1 className="font-bold text-xl">Add service</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Service</span>
                    {services&&<select onChange={(e)=>setService(e.target.value)} className="w-full pb-4 pt-8 px-4 border-2 rounded-lg 
                    focus:border-blue-400 focus:outline-none" required={true}>
                        <option value={null} >---</option>
                        {services.map(service => 
                            <option value={service.service}>{service.name}</option>
                        )} 
                    </select>}
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Snippet</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg 
                    focus:outline-none focus:border-blue-400"
                      onChange={(e)=>setSnippet(e.target.value)} required="true" />
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4 bg-white w-full" >Details</span>
                    <textarea required={true} className="w-full h-32 pb-4 pt-8 px-4 border-2 rounded-lg
                     focus:outline-none focus:border-blue-400"
                     style={{resize:"none"}} onChange={(e)=>setDetails(e.target.value)}  />
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Price ($/hr)</span>
                    <input required={true} type="number" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg 
                    focus:outline-none focus:border-blue-400"
                      onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Discount (%)</span>
                    <input required={true} type="number" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg ]
                    focus:outline-none focus:border-blue-400"
                      onChange={(e)=>setDiscount(e.target.value)}/>
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Image</span>
                    <input required={true} type="file" className="w-full h-20 pb-2 pt-8 px-4 border-2 rounded-lg 
                    focus:border-blue-400 focus:outline-none"
                      onChange={(e)=>getImage(e)}/>
                </div>
                <button type="submit" onClick={(e)=>handleAddService(e)}
                 className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 
                 focus:outline-none" disabled={service==null} >
                    Add Service
                </button>
                
            </div>
        </form>
    </>
}

export default AddService
