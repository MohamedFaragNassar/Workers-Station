import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import SignedUser from '../components/SignedUser'
import UnSignedUser from './UnSignedUser'
import SearchResult from './SearchResult'
import {search} from '../Actions/servicesActions'
import {debounce} from '../helpers/helpers'
import {useClickToClose} from '../helpers/CTC'

const Header = () => {

    const [isOpen,setIsOpen] = useState(false)
    const {userData}  =  useSelector(state => state.userSignIn)
    const {loading,error,result} = useSelector(state => state.search)
    const dispatch = useDispatch()
    const domNode = useClickToClose(()=>setIsOpen(false),"#result")

    const handleSearch = debounce((keyword)=>{
        setIsOpen(true)
        dispatch(search(keyword))
    },300)

    
    return <>
        <div className="h-16 fixed mb-5 top-0 flex items-center z-10
            justify-between border-b-4 rounded-b-lg border-green-300" style={{background:"#11698e",width:90+"%"}}>
             <Link to="/main" className="text-lg md:text-2xl ml-2 lg:ml-10 text-bold text-white">Services</Link>
                <div className="hidden md:flex items-center justify-center h-full w-1/3" >
                    <div className="w-full flex items-center relative" >
                        <input type="text" placeholder="search for services" className="p-2 w-11/12 rounded-lg" 
                            onChange={(e)=>handleSearch(e.target.value)}/>
                        {result&&<SearchResult result={result} isOpen={isOpen} domNode={domNode} close={()=>setIsOpen(false)} />}
                    </div>
                </div>
            
            {userData? <SignedUser/>:  <UnSignedUser />}
        </div>
    </>
}

export default Header
