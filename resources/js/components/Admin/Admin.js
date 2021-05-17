import React from 'react'
import { Route } from 'react-router-dom'
import AdminMenu from './AdminMenu'
import AdminClients from './AdminClients'
import AdminLocations from './AdminLocations'
import AdminSellers from './AdminSellers'
import AdminServices from './AdminServices'
import AdminLogIn from './AdminLogIn'
import AdminRoute from './AdminRoute'

const Admin = () => {
    return (
        <div  className="w-full flex items-start mt-16">
            <AdminMenu />
            <div className="h-auto w-3/4 ml-auto ">
                <Route path="/admin/services"  component={AdminServices}  />
                <Route path="/admin/locations" component={AdminLocations} />
                <Route path="/admin/sellers"   component={AdminSellers}   />
                <Route path="/admin/clients"   component={AdminClients}   />
            </div> 
        </div>
    )
}

export default Admin
