import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Spinner from '../Spinner'
import Status from '../Status'
import {login} from '../../Actions/AdminActions'
const AdminLogIn = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [isOpen,setIsOpen] = useState(false)
    const [id,setID] = useState()
    const dispatch = useDispatch()
    
    const {loading,error,adminData}  =  useSelector(state => state.admin)
    

    const history = useHistory()

    const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(login(id,email,password))
    }

    useEffect(() => {
        if(adminData){
            history.push("/admin/main")
        }
    }, [adminData])
    return <>
        <form className="flex flex-col items-center justify-evenly w-1/3 min h-auto mt-20 bg-white shadow-lg rounded-lg pb-10  pt-4 mx-auto" 
         onSubmit={(e)=>handleLogin(e)}>
            <div className="text-2xl font-bold text-blue-600 text-left mb-2 p-2">Admin Sign In</div>
            
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">ID</span>
                <input required={true} onChange={(e)=>setID(e.target.value)} name="email"
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>
            
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Email</span>
                <input required={true} onChange={(e)=>setEmail(e.target.value)} name="email"
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>
            <div className="w-11/12 relative  mx-auto" >
                <span className="absolute top-2 left-4">Password</span>
                <input required={true} onChange={(e)=>setPassword(e.target.value)} name="password"
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="password"/>
            </div>
            <button type="submit" className="px-20 py-2 bg-blue-400 rounded-full
             font-semibold text-xl text-white hover:bg-blue-500 mt-8" >
               sign In
            </button>
            {loading && <Spinner />}
            {error&& <Status status="fail" message={error}/>}
        </form>
    </>
}

export default AdminLogIn
