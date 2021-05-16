import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getServices,getLocations} from '../Actions/servicesActions'

const Filter = ({isOpen,close}) => {
    
    const [from,setFrom] = useState(0)
    const [to,setTo] = useState(0)
    const [filters,setFilters] = useState([])
    const [filter,setFilter] = useState()
    const appliedFilters = filters.map(filt => filt.filter)
    const options = ["Service","Location","Price"].filter(item => {return !appliedFilters.includes(item)})
    const dispatch = useDispatch()
    const {services} = useSelector(state => state.getServices)
    const {locations} = useSelector(state => state.getLocations)

    const filterByService = (service) =>{
        setFilters([...filters,{filter:"Service",value:service}])
    }

    const filterByLocation = (location) => {
        setFilters([...filters,{filter:"Location",value:location}])
    }
    
    const filterByPrice = () => {
        setFilters([...filters,{filter:"Price",value:`from : ${from} to : ${to}`}])
    }

    useEffect(() => {
       dispatch(getServices())
       dispatch(getLocations())
    }, [])
   
    if(!isOpen){
        return null
    }
   return <>
        <div className="w-60 h-80 shadow-md rounded-md absolute right-10 top-0 bg-white z-20 p-2 ">
            <div>
                <span >Filter By </span>
                <select onChange={(e)=>setFilter(e.target.value)} className="w-full  py-4 px-4 border-2 rounded-lg mb-4 focus:border-blue-400">
                   {options.map(opt => 
                        <option>{opt}</option>
                    )}
                </select>
                {filter==="Service" ? 
                    <select className="w-full  py-4 px-4 border-2 rounded-lg focus:border-blue-400" 
                        onChange={(e)=>filterByService(e.target.value)}>
                        <option value={null} >-</option>
                        {services&&services.map(ser => 
                            <option>{ser.name}</option>
                        )}
                    </select>  :
                    filter === "Price" ?
                    <div>
                        <section>
                            <label>from</label>
                            <input onChange={(e)=>setFrom(e.target.value)} type="number" min={0} max={100} className="w-full py-2 px-2 border-2 rounded-lg focus:border-blue-400"/>
                        </section>
                        <section>
                             <label>to</label>
                            <input type="number" onChange={(e)=>setTo(e.target.value)} min={1} max={100}  className="w-full py-2 px-2 border-2 rounded-lg focus:border-blue-400"/>
                        </section>
                       <button onClick={()=>filterByPrice()} >
                            Add
                        </button>
                    </div>  :
                    filter==="Location" ? 
                    <select className="w-full py-4 px-4 border-2 rounded-lg focus:border-blue-400" 
                        onChange={(e)=>filterByLocation(e.target.value)} >
                        <option value={null} >-</option>
                        {locations&&locations.map(loc => 
                            <option>{loc.details}</option>
                        )}
                    </select>  :
                    null}
                <div>
                    {filters.length > 0 ? <>
                        {filters.map(filt => 
                            <div className="applied-filter">
                                <span className="added-filter" >{filt.filter}</span>
                                <span>{filt.value}</span>
                            </div>    
                        )}
                    <button >Clear Filters</button>
                    </>
                    :null}
                </div>
                    
            </div>
        </div>
    </>
}

export default Filter
  