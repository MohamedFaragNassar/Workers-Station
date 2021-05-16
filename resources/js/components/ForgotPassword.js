import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {sendActivation} from '../Actions/userActions'
import { useHistory } from 'react-router-dom'

const ForgotPassword = ({isOpen,close}) => {

   
    const [email,setEmail] = useState() 
    
    const [type,setType] = useState("client")
    
    const {loading,error,activate} = useSelector(state => state.activateCode)
    
    const history = useHistory()

    const dispatch = useDispatch()

    const handleSendActivation = ()=>{
        dispatch(sendActivation(type,email))
        
        if(activate == "success"){
            history.push(`/activate`)
        }
    }
    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10  " ></div>
        <div id="edit-profile"  className="w-2/5 fixed left-1/3 top-20 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-bold text-xl">Forgot Password</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">You have Account As</span>
                    <select onChange={(e)=>setType(e.target.value)} className="w-full pb-4 pt-8 px-4 border-2 rounded-lg 
                    focus:border-blue-400">
                        <option>client</option>
                        <option>seller</option>
                    </select>
                </div>
                <div  className="w-11/12 relative  mb-4 mx-auto">
                    <span  className="absolute top-2 left-4" >Email</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <button onClick={handleSendActivation} className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md" >
                    Send Activation Code
                </button>
                {loading?<div>loading...</div>:null}
            </div>
        </div>
    </>
}

export default ForgotPassword
