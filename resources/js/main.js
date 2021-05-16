import Header from './components/Header'
import SideMenu from './components/SideMenu'
import Main from './components/Main'
import {BrowserRouter, Link, Redirect, Route,HashRouter} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Cleint from './components/Cleint';
import Seller from './components/Seller';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Activate from './components/Activate';
import ChangePassword from './components/ChangePassword';
import Service from './components/Service';
import AdminRoute from './components/Admin/AdminRoute';
import AdminMain from './components/Admin/AdminMain';
import AdminServices from './components/Admin/AdminServices';
import AdminLocations from './components/Admin/AdminLocations';
import AdminSellers from './components/Admin/AdminSellers';
import AdminClients from './components/Admin/AdminClients';
import AdminLogIn from './components/Admin/AdminLogIn';
import Admin from './components/Admin/Admin';

function App() {
  const {userData}  =  useSelector(state => state.userSignIn)
  const {adminData}  =  useSelector(state => state.admin)
  return <>
      <BrowserRouter >
    <div className="App mx-auto mb-8" style={{width:90+"%"}}>
         <Header/>
          <div className=" h-auto pt-5 w-full min-h-screen" >
            <Route path="/main" component={Main} />
            <Route path="/" exact={true} component={()=><Redirect to={{pathname:"/main"}}/>} />
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/activate" component={Activate}/>
            <Route path="/updatepassword" component={ChangePassword}/>
            <Route path="/service/:id/:service" component={Service}/>
            <ProtectedRoute path="/client/:id" component={Cleint}/>
            <ProtectedRoute path="/seller/:id" component={Seller}/>
            <Route path="/admin" component={Admin} />
            <Route path="/admin/servics" component={AdminServices} />
            <Route path="/admin/locations" component={AdminLocations} />
            <Route path="/admin/sellers" component={AdminSellers} />
            <Route path="/admin/clients" component={AdminClients} />
            <Route path="/admin/login" component={AdminLogIn} />
          </div>
    </div>
    {userData&&<footer className="h-20 z-10 relative" style={{background:"#183153"}}>
      <div className="App mx-auto p-2 h-full flex items-center justify-evenly" style={{width:90+"%"}}>
            <Link className="text-white font-medium md:font-semibold">Contact</Link>
            <Link  className="text-white font-medium md:font-semibold">About Us</Link>
            <Link  className="text-white font-medium md:font-semibold">Terms</Link>
            <Link  className="text-white font-medium md:font-semibold">Privacy Policy</Link>
      </div>
    </footer>}
      </BrowserRouter>
  </>;
}

export default App;
