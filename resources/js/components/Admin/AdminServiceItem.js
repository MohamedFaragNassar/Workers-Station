import React from 'react'

const AdminServiceItem = ({service}) => {
    return <>
        <div className="w-full p-2 h-20 border rounded-sm mt-4 flex items-center justify-between">
            <span>{service.name}</span>
            <span>{service.status}</span>
            <div>
                {service.status=="pending"&&<button>Accept</button>}
                {service.status=="pending"&&<button>Reject</button>}
                <button><i className="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </>
}

export default AdminServiceItem
