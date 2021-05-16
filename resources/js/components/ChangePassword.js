import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'


const ChangePassword = () => {
    const [current,setCurrent]  = useState()
    const [newPassword,setNewPassword]  = useState()
    const [confirmNew,setConfirmNew]  = useState()
    const [Error,setError]  = useState()

    const dispatch = useDispatch()
    
    const handleChangePassword = (e)=>{
        e.preventDefault()
        setError(null)
        if(newPassword != confirmNew){
            setError("password should match")
        }else{
            //dispatch(changePassword(newPassword,current))
        }
    }
    
   

    return (
        <div className="w-1/3 h-auto mt-20 bg-white shadow-lg rounded-lg pb-10  mx-auto">
            <form onSubmit={(e)=>handleChangePassword(e)} className="flex flex-col items-center justify-between mt-5 w-full">
                <div className="text-2xl font-bold text-blue-600 text-left mb-2 p-2">Update Password</div>
                <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Current Password</span>
                    <input onChange={(e)=>setCurrent(e.target.value)} required={true}  
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                 <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">New Password</span>
                    <input onChange={(e)=>setNewPassword(e.target.value)} required={true}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                 <div className="w-11/12 relative  mb-4 mx-auto" >
                    <span className="absolute top-2 left-4">Confirm Password</span>
                    <input onChange={(e)=>setConfirmNew(e.target.value)} required={true}
                     className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
                </div>
                <button className="px-4 py-2 border border rounded-full mr-2
                         text-white bg-blue-400 text-lg font-semibold hover:bg-blue-500 ">Save</button>
            </form>
            
        </div>
    )
}

export default ChangePassword
