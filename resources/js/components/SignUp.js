import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import {register} from '../Actions/userActions'
import {getLocations} from '../Actions/servicesActions'
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Spinner from './Spinner'
import Status from './Status'

const SignUp = () => {
    
    const [first_name,setFirstname] = useState()
    const [last_name,setLasttname] = useState()
    const [email,setEmail] = useState()
    const [address,setAddress] = useState()
    const [phone,setPhone] = useState()
    const [password,setPassword] = useState()
    const [confirm,setConfirm] = useState()
    const [start,setStart] = useState()
    const [end,setEnd] = useState()
    const [Error,setError] = useState()
    const [location,setLocation] = useState()
    const [type,setType] = useState("client")

    
    const history = useHistory()
    const dispatch = useDispatch()
    
    const {loading,error,registeredUser} = useSelector(state => state.registerUser)
    const {userData}  =  useSelector(state => state.userSignIn)
    const {locations} = useSelector(state => state.getLocations)

    const handleSignUp = () => {
        setError(null)
        if(password !== confirm){
            setError("password should match")
        }else{
            dispatch(register(first_name,last_name,email,phone,address,password,type,start,end,location))
        }
    }

    useEffect(() => {
        if(registeredUser){
            history.push("/signin")
        }
        if(userData){
            history.push("/")
        }
        
    }, [registeredUser]) 
    useEffect(() => {
       dispatch(getLocations())
    }, [])
    return <>
    <div className="flex flex-col items-center justify-evenly w-full md:w-3/4 lg:w-1/2 h-auto mt-14 bg-white shadow-lg rounded-lg mx-auto pt-2 pb-2" 
         method="POST" action="/register.php?type=client" encType="multipart/form-data">
            <div className="text-2xl font-bold text-left mb-2" style={{color:"#1597bb"}}>Join Us Now</div>
            <div className="w-11/12 relative  mb-4 mx-auto px-4 flex flex-col items-center justify-between" >
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
            <div className="w-11/12 relative  mb-2 mx-auto flex items-center justify-between" >
               <div className=" relative"  style={{width:48+"%"}} >
                    <span  className="absolute top-2 left-4">First Name</span>
                    <input required={true} onChange={(e)=>setFirstname(e.target.value)} name="first_name"
                    className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="text"/>
               </div>
               <div className=" relative " style={{width:48+"%"}} >
                    <span  className="absolute top-2 left-4">Last Name</span>
                    <input required={true} onChange={(e)=>setLasttname(e.target.value)} name="last_name"
                    className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="text"/>
               </div>
            </div>
            <div className="w-11/12 relative  mb-2 mx-auto" >
                <span className="absolute top-2 left-4">Email</span>
                <input required={true} onChange={(e)=>setEmail(e.target.value)} name="email"
                className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="text"/>
            </div>
            <div className="w-11/12 relative  mb-2 mx-auto" >
                <span className="absolute top-2 left-4">Phone Number</span>
                <input required={true} onChange={(e)=>setPhone(e.target.value)} name="phone"
                className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="text"/>
            </div>
            {type=="seller"&&<div className="w-11/12 relative  mb-4 mx-auto" >
                <span className="absolute top-2 left-4">Location</span>
                <select onChange={(e)=>setLocation(e.target.value)} className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400">
                    <option value={null}>-</option>
                    {locations&&locations.map(loc => 
                        <option>{loc.name}</option>    
                    )}
                </select>
            </div>}
            {type=="client"?<div className="w-11/12 relative  mb-2 mx-auto" >
                <span className="absolute top-2 left-4">Address</span>
                <input required={true} onChange={(e)=>setAddress(e.target.value)} name="address"
                className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400" type="text"/>
            </div>:null}
            <div className="w-11/12 relative  mb-2 mx-auto flex items-center justify-between">
                <div  className=" relative"  style={{width:48+"%"}} >
                    <span className="absolute top-2 left-4">Password</span>
                    <input required={true} onChange={(e)=>setPassword(e.target.value)} name="password"
                    className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="password"/>
                </div>
                <div  className=" relative"  style={{width:48+"%"}} >
                    <span className="absolute top-2 left-4">Confirm Password</span>
                    <input required={true} onChange={(e)=>setConfirm(e.target.value)}
                    className="w-full pb-2 pt-8 px-4 border-2 rounded-lg focus:border-blue-400 focus:outline-none" type="password"/>
                </div>
            </div>
            {type=="seller"&&<div className="w-11/12   mb-2 mx-auto flex items-center justify-between">
                <div className="w-full pb-2 px-4 border-2 rounded-lg focus:border-blue-400 flex flex-col items-start" style={{width:48+"%"}} >
                    <span className="mb-2">Working Start Hour</span>
                    <TimePicker onChange={(t)=>setStart(t.format("LT"))} className="w-full" defaultValue={moment()}  showSecond={false} />
                </div>
                <div className="w-full pb-2 px-4 border-2 rounded-lg focus:border-blue-400 flex flex-col items-start" style={{width:48+"%"}} >
                    <span className="mb-2">Working End Hour</span>
                    <TimePicker onChange={(t)=>setEnd(t.format("LT"))} disabledHours={()=>[]} className="w-full" defaultValue={moment()} showSecond={false} />
                </div>
            </div>}
            <button onClick={()=>handleSignUp()}
             className="px-20 py-2 bg-gray-600 rounded-lg focus:outline-none
             font-semibold text-xl text-white hover:bg-gray-500 mt-4" >
               
                sign up
            </button>
            <Link to="/signin/ " className="text-blue-600 focus:outline-none hover:text-blue-800 mt-2" >
                already have account ? Sign in
            </Link>
            {loading && <Spinner />}
            {Error&& <Status status="fail" message={Error}/>}
            {error&& <Status status="fail" message={error.message}/>}
        </div>

    </>
}

export default SignUp
