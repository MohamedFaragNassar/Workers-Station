import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {login} from '../Actions/userActions'
import ForgotPassword from './ForgotPassword'
import Spinner from './Spinner'
import Status from './Status'

const SignIn = () => {

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [isOpen,setIsOpen] = useState(false)
    const [type,setType] = useState("client")
    const dispatch = useDispatch()
    
    const x = useSelector(state => state.userSignIn)
    const {loading,error,userData}  = x
    
    console.log(x)

    const history = useHistory()

    const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(login(email,password,type))
    }
 
    useEffect(() => {
        if(userData){
            history.push("/")
        }
    }, [userData]) 
    
    return <>
        <form className="flex flex-col items-center justify-evenly w-full md:w-3/4 lg:w-1/3 h-auto mt-20 bg-white shadow-lg rounded-lg pb-10  pt-4 mx-auto" 
         onSubmit={(e)=>handleLogin(e)}>
            <div className="text-2xl font-bold text-left mb-2 p-2" style={{color:"#1597bb"}}>Sign In Now</div>
            <div className="w-11/12 relative  mb-4 mx-auto px-4 flex flex-col items-center justify-between" >
                <span className="mb-2">Sign in as</span>
                <div className="flex items-center justify-between w-full gap-5">
                    <div onClick={()=>setType("client")}
                    className={`w-1/2  p-5 rounded-md cursor-pointer  flex items-center justify-center
                    ${type=="client"?"border-2 border-blue-500 bg-gray-50":"border"} `}>
                        <img className="w-10 h-10" src="../client.png" alt=""/>
                        <span className="w-fu">client</span>
                    </div>
                    <div onClick={()=>setType("seller")}
                    className={`w-1/2  p-5 rounded-md cursor-pointer flex items-center justify-center
                    ${type=="seller"?"border-2 border-blue-500 bg-gray-50":"border"} `}>
                        <img className="w-10 h-10" src="../seller.png" alt=""/>
                        <span>Seller</span>
                    </div>
            </div>
            </div>
            <div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Email</span>
                <input required={true} onChange={(e)=>setEmail(e.target.value)} name="email"
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="text"/>
            </div>
            <div className="w-11/12 relative  mx-auto" >
                <span className="absolute top-2 left-4">Password</span>
                <input required={true} onChange={(e)=>setPassword(e.target.value)} name="password"
                className="w-full pb-4 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="password"/>
            </div>
            <button type="submit" className="px-20 py-2 bg-gray-600 rounded-lg focus:outline-none
             font-semibold text-xl text-white hover:bg-gray-500 mt-4"  >
               sign In
            </button>
            <button onClick={()=>setIsOpen(true)} className="text-blue-600 hover:text-blue-800 mt-2 focus:outline-none" >
                forgot your password ?
            </button>
            <Link to="/signup/ " className="text-blue-600 hover:text-blue-800 mt-2 focus:outline-none" >
                dont have account yet ? Sign Up
            </Link>
            {loading && <Spinner />}
            {error&& <Status status="fail" message={error}/>}
        </form>
        <ForgotPassword isOpen={isOpen} close={()=>setIsOpen(false)} type={type} />
    </>
}

export default SignIn
