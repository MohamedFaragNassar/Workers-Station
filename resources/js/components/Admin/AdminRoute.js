import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({component:Component,...rest}) => {
   const {adminData} = useSelector(state => state.admin)
   return (
    <Route {...rest} render = {props => {
        if(adminData){
            return <Component {...props} />
        }else{
            return <Redirect to={{pathname:"/admin/login"}}/>
        }
    }} />
)
}

export default AdminRoute
