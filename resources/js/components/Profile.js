import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {updatePersonalImage,deleteAccount, logout} from '../Actions/userActions'
import EditProfile from './EditProfile'
import Confirm from './Confirm'
import {useClickToClose} from '../helpers/CTC'

const Profile = ({profile,type}) => {
    console.log(profile)
    const [isOpen,setIsOpen] = useState(false)
    const [isDelOpen,setIsDelOpen] = useState(false)
    const [x,SetX] = useState(false)
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.userSignIn)
    const history = useHistory(); 
    const folder = type == "client" ? "clients" : "sellers";


    const node = useClickToClose(()=>setIsOpen(false),"#edit-profile")


    const handleUploadPersonalImage = (e) => {
        const formData = new FormData()
        const img = e.target.files[0]
        formData.append("image",img)
        dispatch(updatePersonalImage(formData,userData?.id,type))
        SetX(!x)
    }

    const hanledelAccount = ()=>{
        dispatch(deleteAccount(type))
        //dispatch(logout())
       
    }

    useEffect(() => {
       
    }, [userData])
    
    return <>
        {profile&&<div className="w-full  lg:w-1/3 shadow-lg rounded-md mt-12 lg:mt-20 p-5  bg-white relative">
            {userData?.id==profile.id?
            <button className="text-2xl text-gray-600 hover:text-gray-400 absolute top-2 right-2" onClick={()=>setIsOpen(true)}>
                <i className="far fa-edit"></i>
            </button>:null}
            <div className="w-3/4 mx-auto flex items-center justify-start md:items-center flex-col mt-8 mb-10">
                <div className="relative">
                    <img src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621061309/profiles/${folder}/${profile.id}.jpg`} 
                    className="w-32 h-32 rounded-full" />
                   {userData?.id==profile.id? <><input id="image" type="file" 
                   onChange={(e)=>handleUploadPersonalImage(e)} className="hidden"/>
                    <label htmlFor="image" className=" text-2xl opacity-70 hover:opacity-100 cursor-pointer absolute center " >
                        <i className=" text-2xl op fal fa-camera-alt text-gray-300 font-bold"></i>
                    </label></>:null}
                </div>
                <div className="text-2xl font-bold mt-2">
                    <span>{profile.first_name}</span> <span>{profile.last_name}</span>
                </div>
            </div>
            <div className="w-full  md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl">
                <i className="far fa-envelope"></i>
                <span className="w-10/12 text-left break-all" >{profile.email}</span>
            </div>
            <div className="w-full md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                <i className="fal fa-mobile-android"></i>
                <span className="w-10/12 text-left" >{profile.phone}</span>
            </div>
            { type=="seller"? <>
                <div className="w-full md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                    <i className="fas fa-compass"></i>
                    <span className="w-10/12 text-left" >{profile.location}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                    <i className="fas fa-clock"></i>
                    <span className="w-10/12 text-left" >{profile.daily_start}</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl" >
                    <i className="far fa-clock"></i>
                    <span className="w-10/12 text-left" >{profile.daily_end}</span>
                </div>
            </>:null}
            {type=="client" ?<div className="w-full md:w-1/2 lg:w-4/5 mt-8 flex items-center justify-between mx-auto text-xl">
                <i className="fas fa-compass"></i>
                <span className="w-10/12 text-left">{profile.address}</span>
            </div>:null}
            {/* {userData?.id==profile.id&&<button onClick={()=>setIsDelOpen(true)}
            className="px-4 py-3 bg-red-500 rounded-lg text-white mt-7 hover:bg-red-600 font-semibold" >
                Delete My Account
            </button>} */}
        </div>}
        {/* <Confirm title="Deleting Your Account" message="Are you sure you want to delete your account"
         isOpen={isDelOpen} close={()=>setIsDelOpen(false)} handler={()=>hanledelAccount()} /> */}
        {userData?.id==profile.id&&<EditProfile isOpen={isOpen} domNode={node} close={()=>setIsOpen(false)} user={profile} />}
    </>
}

export default Profile
