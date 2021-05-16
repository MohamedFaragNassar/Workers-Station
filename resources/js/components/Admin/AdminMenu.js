import React from 'react'
import {Link} from 'react-router-dom'
const AdminMenu = () => {
    return <>
         <div className="fixed top-0 h-screen border-l-2 border-r-2 flex flex-col items-center 
         bg-white shadow-lg rounded-lg" style={{width:20+"%"}}>
            <div className={`flex flex-col items-center mt-5  w-full`}>
                <Link to="/admin/main"  className="text-lg font-semibold px-8 py-4 hover:bg-gray-200 rounded-full" >Main</Link>
                <Link to="/admin/services"  className="text-lg font-semibold px-8 py-4 hover:bg-gray-200 rounded-full" >Services</Link>
                <Link to="/admin/locations"  className="text-lg font-semibold px-8 py-4 hover:bg-gray-200 rounded-full" >Locations</Link>
                <Link to="/admin/sellers"  className="text-lg font-semibold px-8 py-4 hover:bg-gray-200 rounded-full" >Sellers</Link>
                <Link to="/admin/clients"  className="text-lg font-semibold px-8 py-4 hover:bg-gray-200 rounded-full" >Clients</Link>
            </div>
        </div>
    </>
}

export default AdminMenu
