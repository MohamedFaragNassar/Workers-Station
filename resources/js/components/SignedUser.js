import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../Actions/userActions'
import {useClickToClose} from '../helpers/CTC'

const SignedUser = () => {

    const [isOpen,setIsOpen] = useState(false)
    const dispatch = useDispatch()
     const handleLogout = ()=>{
        dispatch(logout())
    }
    const {userData} = useSelector(state => state.userSignIn)

    const node = useClickToClose(()=>setIsOpen(false),"#userMenu")
    
    const type = localStorage.getItem("type")
    const folder = type == "client" ? "clients" : "sellers";

    return <>
       {userData && <div className="mr-1 md:mr-4 w-1/2 md:w-max lg:mr-10 relative" onClick={()=>setIsOpen(!isOpen)}>
            <div className="flex items-center hover:bg-gray-600 px-2 py-1 lg-px-4 lg:py-2 rounded-lg cursor-pointer ">
                <img className="w-10 h-10 rounded-full" 
                src={`https://res.cloudinary.com/dt3fknrkp/image/upload/v1621061309/profiles/${folder}/${userData.id}.jpg`} />
                <span className="ml-1 md:ml-2 text-white text-sm md:text-lg lg:text-xl truncate">
                    {`${userData.first_name} ${userData.last_name}`}
                </span>
                <span className="ml-1 md:ml-2 text-white"><i className="fas fa-chevron-circle-down"></i></span>
            </div>
            {isOpen&&<div id="userMenu" ref={node} className="lg:mr-20 w-11/12 lg:w-60 bg-white shadow-md rounded-lg p-5
                                         absolute top-16 left-2 md:left-6 lg:left-1 flex flex-col items-center" >
                <Link to={`/${type}/${userData.id}`} className="text-xl text-center p-5 
                focus:outline-none text-gray-600 hover:bg-gray-200 w-full" >Profile</Link>
                <button onClick={handleLogout} className="text-xl p-5 text-gray-600 
                focus:outline-none hover:bg-gray-200 w-full">Logout</button>
            </div>}
        </div>}
   </>
}

export default SignedUser
