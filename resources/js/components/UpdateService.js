import React, {useState } from 'react'
import { useDispatch } from 'react-redux'
import {updateService} from "../Actions/servicesActions"

const UpdateService = ({isOpen,close,service}) => {

    const [price,setPrice] = useState(service.price) 
    const [details,setDetails] = useState(service.details) 
    const [snippet,setSnippet] = useState(service.snippet) 
    const [discount,setDiscount] = useState(service.discount) 
    const [image,setImage] = useState() 
    
    const dispatch = useDispatch()

    const handleUpdateService = (e)=>{
        e.preventDefault()
        dispatch(updateService(service.service,service.seller_id,price,snippet,details,discount,image))
        close();
    }

    const getImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
    }

    
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <form id="edit-profile"  className="w-2/5 fixed left-1/3 top-8 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-bold text-xl">Update service</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
               <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Snippet</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setSnippet(e.target.value)} defaultValue={snippet} required="true" />
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Details</span>
                    <textarea required={true} className="w-full h-32 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                     style={{resize:"none"}} defaultValue={details} onChange={(e)=>setDetails(e.target.value)}  />
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Price (EGP/hr)</span>
                    <input required={true} type="number" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setPrice(e.target.value)} defaultValue={price}/>
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Discount (%)</span>
                    <input required={true} type="number" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setDiscount(e.target.value)} defaultValue={discount}/>
                </div>
                <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Image</span>
                    <input required={true} type="file" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>getImage(e)}/>
                </div>
                <button type="submit" onClick={(e)=>handleUpdateService(e)} className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md hover:bg-gray-500" disabled={service==null} >
                    Update Service
                </button>
                
            </div>
        </form>
    </>
}

export default UpdateService
