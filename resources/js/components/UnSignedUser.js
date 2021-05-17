import React from 'react'
import {Link} from 'react-router-dom'

const UnSignedUser = () => {
    return (
        <div className="md:mr-4 w-1/2 md:w-1/4 lg:w-max lg:mr-10" >
            <Link className="lg:text-xl lg:p-5 md:p-2 p-1 text-white" to="/signin">Sign in</Link>
            <Link className="lg:text-xl lg:p-5 md:p-2 p-1 text-white" to="/signup">Sign up</Link>
        </div>
    )
}

export default UnSignedUser
