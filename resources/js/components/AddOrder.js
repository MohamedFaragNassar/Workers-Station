import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {addOrder} from '../Actions/ordersActions'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const AddOrder = ({isOpen,close,service,seller}) => {

   
    const [amount,setAmount] = useState() 
    const [date,setDate] = useState() 
    const [time,setTime] = useState() 
    const [image,setImage] = useState() 
    const {userData} = useSelector(state => state.userSignIn)
    
    const history = useHistory()
    const dispatch = useDispatch()

    const getImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
    }

    const handleAddOrder = (e)=>{
        e.preventDefault()
        dispatch(addOrder(service.service,seller.id,amount,userData.id ,date,image))
        close()
    }

    useEffect(() => {
       
    }, [])
    
    
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <form id="edit-profile"  className=" w-5/6 md:w-2/5 fixed md:left-1/3 top-8 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-semibold text-lg md:font-bold md:text-xl">
                        {`Ordering ${service.service} from ${seller.first_name} ${seller.last_name}`}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
               <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Amount (hr)</span>
                    <input required={true} type="number" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setAmount(e.target.value)}/>
                </div>
               <div  className="w-11/12 relative mt-4 mb-6  mx-auto">
                    <span  className="absolute top-2 left-4" >Starts At</span>
                    <input required={true} type="date" className="w-full h-16 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setDate(e.target.value)}/>
                </div>
               <div  className="w-11/12 relative  mb-2 mx-auto">
                    <span  className="absolute top-2 left-4" >Image</span>
                    <input required={true} type="file" className="w-full h-20 pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>getImage(e)}/>
                </div>
                <button type="submit" onClick={(e)=>handleAddOrder(e)} className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md hover:bg-gray-500" disabled={service==null} >
                   Confirm Order
                </button>
                
            </div>
        </form>
    </>
}

export default AddOrder
