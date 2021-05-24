import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {getServices} from "../Actions/servicesActions"

const SideMenu = () => {
    const {services} = useSelector(state => state.getServices)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getServices())
    }, [])
    return <>
        <div className="fixed top-20 h-screen border-l-2 border-r-2 hidden lg:flex flex-col items-center 
         bg-white shadow-lg rounded-lg" style={{height:"86vh",width:17+"%"}}>
            <div className="flex items-center mt-5">
                <img src="desktop.svg" className="w-6 mr-2 h-6" />
                <h1 className="text-xl font-bold">All Services</h1>
            </div>
            {services&&<div className={`flex flex-col items-center mt-5 ${services.length > 8 ? "ovoverflow-y-scroll":""} w-full`}>
                <Link to="/main"  className="focus:outline-none text-lg font-semibold px-8 py-4
                 hover:bg-gray-200 rounded-full" >Top Rated</Link>
                {services?.map(service => 
                    <Link className="text-lg font-semibold px-8  py-4 hover:bg-gray-200 rounded-full focus:outline-none"
                     to={`/main/service/${service.name}`} key={service.name} >{service.name}</Link>    
                )}
            </div>}
        </div>
    </>
}

export default SideMenu
