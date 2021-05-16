import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({isOpen,result,domNode,close}) => {
    if(!isOpen){
        return null
    }
    return <>
        {result&&<div ref={domNode} id="result" className="w-11/12 bg-white rounded-md  flex flex-col py-2 absolute top-12 shadow-lg">
                {result.map(service => 
                    <Link onClick={close} to={`/main/service/${service.name}`} className="w-full p-2 text-lg  hover:bg-gray-100 border">{service.name}</Link>    
                )}
        </div>}
    </>
}

export default SearchResult
