import {ADMIN_LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGOUT} from '../Constants/AdminConstants'
import Axios from "axios"


const login = (id,email,password) => async (dispatch)=>{
    try{
        dispatch({type:ADMIN_LOGIN_REQUEST})
        
        const formData = new FormData()
        formData.append("id",id)
        formData.append("email",email)
        formData.append("password",password)
        const {data} = await Axios.post(`api/adminlogin.php`,formData)
        localStorage.setItem("adminData",JSON.stringify(data))
        dispatch({type:ADMIN_LOGIN_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:ADMIN_LOGIN_FAIL,payload:err})
    }
}

export {login}