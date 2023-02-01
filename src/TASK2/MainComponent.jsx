import React, { Component } from "react";
import { Route, Switch,Redirect} from "react-router-dom";
 import CompA from "./Welcome";
import Login from "./Login";
import NavBar from "./Navbar";
import Person from "./person";
import ADDPerson from "./ADDPerson";
import DeletePerson from "./delete";
import logout from "./Logout";
import authSys from "./services/authSys";
import Users from "./users"
import NotAllowed from "./notalo";
import myJuniors from "./compA";
import CompC from "./Trac";
class MainComponent extends Component {
render() {
  const user=authSys.getUser()
 
return (
<div className="container">
<NavBar user={user}/>

<Switch> <Route
path="/productApp/products/:id/delete"
render={(props) =>
user && user[0].role=="admin"? <DeletePerson {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/AddProduct"
render={(props) =>
user ? <ADDPerson {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/AddProduct/:id/edit"
render={(props) =>
user && user[0].role=="admin"? <ADDPerson {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/productApp/products/:id"
render={(props) =>
user&& user[0].role=="admin" ? <ADDPerson {...props}
/> : <Redirect to="/notAllowed" 
/>}/>
<Route
path="/myDetails"
render={(props) =>
  user ? <Users {...props}
/> : <Redirect to="/notAllowed" 
/>}/>

 



<Route path="/welcome" component={CompA} />
<Route path="/tracker" component={CompC} />
<Route path="/myJuniors" component={myJuniors} />



<Route path="/Login" component={Login} />
<Route path="/Logout" component={logout} />
<Route path="/NotAllowed" component={NotAllowed} />
<Route path="/productApp/products/:id" component={Person} />

</Switch>
</div>
);
}
}
export default MainComponent;