import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateProfile,updatePersonalImage} from '../Actions/userActions'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const EditProfile = ({isOpen,close,domNode,user}) => {

    const {userData}  =  useSelector(state => state.userSignIn)
     
    const [first_name,setFirstname] = useState()
    const [last_name,setLasttname] = useState() 
    const [email,setEmail] = useState() 
    const [phone,setPhone] = useState() 
    const [address,setAddress] = useState() 
    const [start,setStart] = useState()
    const [end,setEnd] = useState()

    const dispatch = useDispatch()
    const type = localStorage.getItem("type")
    
    
    const handleUpdateProfile = (e) =>{
        e.preventDefault()
        dispatch(updateProfile(
            first_name,
            last_name,
            email,
            phone,
            address,
            start,
            end,
            type,
            userData.id
       ))

        close()
    }


    if(!isOpen){
        return null
    }
    return <>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-400 opacity-70 z-10 " ></div>
        <div id="edit-profile" ref={domNode} className="w-5/6 lg:w-2/5 fixed  top-10  lg:left-1/3 md:top-5 rounded-2xl
          bg-white flex flex-col items-center justify-between py-2 z-20" >
            <div className="w-full mx-auto flex  items-center justify-between   mb-2 " >
                <div className="flex w-36 items-center justify-between ml-2">
                    <button className="ml-2 text-lg" onClick={close}><i class="fal fa-times-circle"></i></button>
                    <h1 className="font-bold text-xl">Edit Profile</h1>
                </div>
                <button  onClick={(e)=>handleUpdateProfile(e)}
                    className="px-6 py-1 border  rounded-lg mr-8
                    text-white bg-gray-600 text-lg font-semibold hover:bg-gray-500  ">
                         Save
                </button>
            </div>
            <div className="flex flex-col items-center justify-between mt-5 w-full" >
                <div className="w-11/12 relative flex items-center justify-between  mb-4 mx-auto" >
                    <div className="relative" style={{width:45+"%"}}>
                        <span className="absolute top-2 left-4">First Name</span>
                        <input onChange={(e)=>setFirstname(e.target.value)}  defaultValue={user?.first_name}
                        className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:outline-none focus:border-blue-400" 
                        type="text"/>
                    </div>
                    <div  className="relative"  style={{width:45+"%"}}>
                        <span className="absolute top-2 left-4">Last Name</span>
                        <input onChange={(e)=>setLasttname(e.target.value)} defaultValue={user?.last_name}
                        className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:outline-none focus:border-blue-400" 
                        type="text"/>
                    </div>
                </div>
                <div  className="w-11/12 relative  mb-4 mx-auto">
                    <span  className="absolute top-2 left-4" >Email</span>
                    <input className="w-full h-20 pb-4 pt-8 px-4 border-2 rounded-lg focus:outline-none
                     focus:border-blue-400"
                      onChange={(e)=>setEmail(e.target.value)} defaultValue={user?.email} />
                </div>
                {type=="client."?<div  className="w-11/12 relative  mb-4 mx-auto">
                    <span className="absolute top-2 left-4" >Address</span>
                    <input  onChange={(e)=>setAddress(e.target.value)} defaultValue={user?.address}
                     className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:outline-none focus:border-blue-400" 
                     type="text"/>
                </div>:null}
                <div  className="w-11/12 relative  mb-4 mx-auto">
                    <span className="absolute top-2 left-4" >Phone</span>
                    <input onChange={(e)=>setPhone(e.target.value)} defaultValue={user?.phone}
                    className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:outline-none focus:border-blue-400"
                     type="text"/>
                </div>
                {type=="seller"&&<div className="w-11/12 relative  mb-2 mx-auto flex items-center justify-between">
                    <div className="w-full pb-2 px-4 border-2 rounded-lg focus:outline-none 
                    focus:border-blue-400 flex flex-col items-start" style={{width:48+"%"}} >
                        <span className="mb-2">Working Start Hour</span>
                        <TimePicker onChange={(t)=>setStart(t.format("LT"))} className="w-full" defaultValue={moment()}  
                        showSecond={false} />
                    </div>
                    <div className="w-full pb-2 px-4 border-2 rounded-lg focus:outline-none focus:border-blue-400
                     flex flex-col items-start" style={{width:48+"%"}} >
                        <span className="mb-2">Working End Hour</span>
                        <TimePicker onChange={(t)=>setEnd(t.format("LT"))} disabledHours={()=>[]} className="w-full" 
                        defaultValue={moment()} showSecond={false} />
                    </div>
            </div>}
            </div>
        </div>
    </>
}

export default EditProfile
