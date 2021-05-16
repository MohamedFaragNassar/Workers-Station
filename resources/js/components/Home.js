import React from 'react'
import Header from './Header'
import SideMenu from './SideMenu'
import Main from './Main'
import { Redirect, Route} from 'react-router-dom'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Cleint from './Cleint';
import Seller from './Seller';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import Activate from './Activate';
import ChangePassword from './ChangePassword';
import Service from './Service';
const Home = () => {
    return <>
        <Header/>
          <div className=" h-auto pt-5 w-full" >
            <Route path="/main"  exact={true} component={Main} />
            <Route path="/" exact={true} component={()=><Redirect to={{pathname:"/main"}}/>} />
            <Route path="/main/signin" component={SignIn}/>
            <Route path="/main/signup" component={SignUp}/>
            <Route path="/main/activate" component={Activate}/>
            <Route path="/main/updatepassword" component={ChangePassword}/>
            <Route path="/main/service/:id/:service" component={Service}/>
            <ProtectedRoute path="/main/client/:id" component={Cleint}/>
            <ProtectedRoute path="/main/seller/:id" component={Seller}/>
          </div>
    </>
}

export default Home
