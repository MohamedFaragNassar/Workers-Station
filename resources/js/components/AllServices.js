import React, { useEffect, useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import {getServices,getTopTen,getTopFour} from "../Actions/servicesActions"
import { useDispatch, useSelector } from 'react-redux'
import Highlight from './Highlight'
import Filter from './Filter'

const AllServices = () => {

    const [isOpen,setIsOpen] = useState(false)
    const [index,setIndex] = useState(0)
    const {services} = useSelector(state => state.getServices)
    const dispatch = useDispatch()

    const {highlightedServices} = useSelector(state => state.topTen)
    const {loading,error,data} = useSelector(state => state.topFour)
    
    const handleNext = () =>{
        if(index < highlightedServices.length-1){
            setIndex(index+1)
        }else{
            setIndex(0)
        }
    }

    const handlePrev = () => {
        if(index > 0){
            setIndex(index-1)
        }else{
            setIndex(highlightedServices.length-1)
        }
    }

    
    
    
    useEffect(() => {
        dispatch(getTopTen())
        dispatch(getTopFour())
        
    }, [])

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            if( highlightedServices && index < highlightedServices.length-1){
                setIndex(index => index + 1);
            }else{
                setIndex(1)
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [index])
    
    return <>
        <div className="w-full">
          {highlightedServices?.length > 0 && <div className= "hidden md:block relative w-full lg:w-3/4 mx-auto">
                <button onClick={()=>handleNext()} 
                className=" absolute left-0 h-full rounded-l-lg w-10 bg-gray-100 bg-opacity-50 hover:bg-opacity-80 focus:outline-none ">
                    {"<"}
                </button>
                   {highlightedServices && <Highlight service={highlightedServices[index]} />} 
                <button onClick={()=>handlePrev()} 
                className=" absolute right-0 top-0 rounded-r-lg h-full w-10 bg-gray-100 bg-opacity-50 hover:bg-opacity-80 focus:outline-none">
                    {">"}
                </button>
            </div>}
            <div className="flex items-center flex-wrap justify-between w-full" >
                {data?.map(cat => {
                    if(cat[1].length > 0){
                        return <div className="w-full mb-5">
                            <div className="w-full h-12 text-white flex items-center justify-between rounded-lg shadow-md "
                                style={{background:"#28abb9"}}>
                                    <span className="ml-10 font-bold text-xl" >{cat[0]}</span>
                                    <span className="mr-10">Top Rated Sellers</span>
                                </div>
                                <div className="flex items-center justify-start flex-wrap gap-4 px-5">
                                    {cat[1]?.map(ser => 
                                        <ServiceCard service={ser} key={ser.name} />
                                    )}
                                </div>
                             </div>   
                        }
                    }
                )} 
            </div>
        </div>
    </>
}

export default AllServices
