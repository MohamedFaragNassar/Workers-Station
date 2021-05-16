import React from 'react'

const AdminLocationItem = ({location}) => {
    return <>
        <div className="w-full p-2 h-20 border rounded-sm mt-4 flex items-center justify-between">
            <span>{location.name}</span>
            <span>{location.status}</span>
            <div>
                {location.status=="pending"&&<button>Accept</button>}
                {location.status=="pending"&&<button>Reject</button>}
                <button><i className="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </>
}

export default AdminLocationItem
