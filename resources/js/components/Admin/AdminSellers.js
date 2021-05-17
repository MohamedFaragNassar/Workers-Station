import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {deleteUser, getUsers} from '../../Actions/AdminActions'
import Spinner from '../Spinner'
import Status from '../Status'
import Confirm from './Confirm'

const AdminSellers = () => {
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
    const [user,setUser] = useState()
    const {loading,error,users} = useSelector(state => state.getUsers)

    const handleDelUser = ()=>{
        dispatch(deleteUser(user.id,"seller"))
        setIsOpen(false)
    }

    const hanleOpenModal = (user) => {
        setUser(user)
        setIsOpen(true)
    }

    useEffect(() => {
        dispatch(getUsers("seller"))
    }, [])
    return <>
        <div className="mb-8 text-lg font-semibold">All Sellers</div>
        {loading?<Spinner /> : error ? <Status message={error.message} />:null}
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between ">
                <span className="text-left w-1/4">Name</span>
                <span className="text-left w-1/3">Email</span>
                <span  className="text-left w-1/4">Location</span>
                <span className="w-1/12"></span>
            </div>
            {users?.map(user => 
                <div className="w-full flex items-center justify-between border rounded-lg p-4 mt-3">
                    <span className="text-left w-1/4 break-words">{`${user.first_name} ${user.last_name}`}</span>
                    <span className="text-left w-1/3 break-words">{`${user.email}`}</span>
                    <span className="text-left w-1/4 break-words">{`${user.location}`}</span>
                    <button className="w-1/12" onClick={()=>hanleOpenModal(user)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>   
            )}
        </div>
        {isOpen&&<Confirm header="Deleting User" message= {`Are you sure you want to delete ${user.first_name} ${user.last_name}`}
        handler={()=>handleDelUser()} close={()=>setIsOpen(false)} />}
        
    </>
}

export default AdminSellers
