import React, { useEffect, useState } from 'react'

const Status = ({status,message}) => {
    const [isOpen,setIsOpen] = useState(true)
    useEffect(() => {
        
    }, [message])
    
    if(!isOpen){
        return null
    }
    return <>
        <div className={`w-4/5 mx-auto mt-2 h-10 rounded-lg p-2 flex items-center justify-between text-white ${status=="success"?"bg-green-300":"bg-red-400"}`} >
            <div>
                {status=="success"?<i className=" fas fa-check-circle"></i>:<i className="fas fa-times-circle"></i>}
                <span className="ml-2">{message}</span>
            </div>
            <button className="focus:outline-none" onClick={()=>setIsOpen(false)} ><i className="fas fa-times"></i></button>
        </div>
    </>
}

export default Status
