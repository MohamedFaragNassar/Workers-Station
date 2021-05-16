import React, { useEffect } from 'react'
import SideMenu from './SideMenu'
import { Route } from 'react-router-dom'
import AllServices from './AllServices'
import ServicePage from './ServicePage'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'
import Status from './Status'


const Main = () => {
    const {loading,error,delAccount} = useSelector(state => state.deleteAccount)
    return (
        <div className="pt-16 w-full min-h-screen flex items-start" >
            <SideMenu />
            <div  className=" w-full lg:ml-auto lg:w-4/5" >
                {loading?<Spinner/>:error ? <Status message="Somthing went wrong when trying to delete your account, please ty again" 
                status="fail"/>:delAccount=="ok"?<Status status="success" message="Your account has been deleted successfully"/>:null}
                <Route exact={true} path="/main" component={AllServices} />
                <Route path="/main/service/:service" component={ServicePage} />
            </div>
            
        </div>
    )
}

export default Main
