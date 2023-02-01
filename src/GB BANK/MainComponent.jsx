import React, { Component } from "react";
import { Route, Switch,Redirect} from "react-router-dom";
 import CompA from "./VIEWCUST";
import Login from "./Login";
import NavBar from "./Navbar";

import logout from "./Logout";
import authSys from "./services/authSys";

import NotAllowed from "./notalo";
import NotAllowed1 from "./Welcome";
import NotAllowed2 from "./w2";
import ADDEmp from "./addcustomer";

import Hello1 from "./customerDetails";
import Payee from "./payee";
import Cheques from "./allchaq";
import Netbank from "./netbank";
import ViewCheques from "./viewchqemp";
import ViewNet from "./ViewNet";
import Hello2 from "./nominee";
import CT from "./chectrans";
import NetPayee from "./netbpay";
class MainComponent extends Component {
render() {
  const user=authSys.getUser()
 
return (
<div className="container">
<NavBar user={user}/>

<Switch>
   <Route path="/NotAllowed" component={NotAllowed} />
<Route
path="/admin"
render={(props) =>
user && user.role=="manager"? <NotAllowed1 {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/addcustomer"
render={(props) =>
user && user.role=="manager"? <ADDEmp {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/Cheques"
render={(props) =>
user && user.role=="manager"? <Cheques {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/allNet"
render={(props) =>
user && user.role=="manager"? <Netbank {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/allCustomer"
render={(props) =>
user && user.role=="manager"? <CompA {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/viewCheques"
render={(props) =>
user && user.role=="customer"? <ViewCheques {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/customerDetails"
render={(props) =>
user && user.role=="customer"? <Hello1 {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/nomineeDetails"
render={(props) =>
user && user.role=="customer"? <Hello2 {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/Cheque"
render={(props) =>
user && user.role=="customer"? <CT {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/viewNet"
render={(props) =>
user && user.role=="customer"? <ViewNet {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/customer"
render={(props) =>
user && user.role=="customer"? <NotAllowed2 {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/Add Payee"
render={(props) =>
user && user.role=="customer"? <Payee {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/NetBanking"
render={(props) =>
user && user.role=="customer"? <NetPayee {...props}
/> : <Redirect to="/notAllowed" 
/>}/>




<Route path="/Login" component={Login} />
<Route path="/Logout" component={logout} />





</Switch>
</div>
);
}
}
export default MainComponent;