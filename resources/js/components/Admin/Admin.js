import React from 'react'
import { Route } from 'react-router-dom'
import AdminMain from './AdminMain'
import AdminMenu from './AdminMenu'
import AdminClients from './AdminClients'
import AdminLocations from './AdminLocations'
import AdminSellers from './AdminSellers'
import AdminServices from './AdminServices'
import AdminLogIn from './AdminLogIn'
import AdminRoute from './AdminRoute'

const Admin = () => {
    return (
        <div  className="w-full flex items-start">
            <AdminMenu />
            <div className="h-auto w-3/4 ml-auto">
                <AdminRoute path="/admin/main"      component={AdminMain}      />
                <AdminRoute path="/admin/services"  component={AdminServices}  />
                <AdminRoute path="/admin/locations" component={AdminLocations} />
                <AdminRoute path="/admin/sellers"   component={AdminSellers}   />
                <AdminRoute path="/admin/clients"   component={AdminClients}   />
                <Route      path="/login"           component={AdminLogIn}     />
            </div> 
        </div>
    )
}

export default Admin
