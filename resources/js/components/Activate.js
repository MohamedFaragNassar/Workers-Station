import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Activate = () => {
    const [code,setCode] = useState()
    const type = localStorage.getItem("type")
    const {userData}  =  useSelector(state => state.userSignIn)
    const history = useHistory()
    const handleConfirm = ()=>{

    }
    useEffect(() => {
        if(userData){
            history.push("/")
        }
    }, [userData])
    return <>
        <div id="edit-profile"  className="w-2/5 mt-20 rounded-2xl pb-5
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex  items-center justify-between ml-2">
                    <button className="mx-2 text-lg" ><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-bold text-xl">Activation Code</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div  className="w-11/12 relative  mb-4 mx-auto">
                    <span  className="absolute top-2 left-4" >Code</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400"
                      onChange={(e)=>setCode(e.target.value)} />
                </div>
                <button onClick={handleConfirm} className="px-4 py-2 mt-2 bg-gray-600 text-white rounded-md" >
                    Confirm
                </button>
            </div>
        </div>
    </>
}

export default Activate
