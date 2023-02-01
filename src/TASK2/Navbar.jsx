import React, { Component } from "react";
import {Link} from "react-router-dom";
class NavBar extends Component {
render() {
    let {user}=this.props

return (<React.Fragment>


<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
<div className="container">

<div className="col-11">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
<Link to="/" className="navbar-brand">
EMPLOYEES
</Link>

</li>
{  user  &&(<li className="nav-item">
<Link className="nav-link" to="/myDetails">
myDetails 
</Link>
</li>)}
{  user  &&(<li className="nav-item">
<Link className="nav-link" to="/myJuniors">
myJuniors 
</Link>
</li>)}
{  (<li className="nav-item">
<Link className="nav-link" to={`/tracker`}>
tracker
</Link>
</li>)}
</ul>
</div>

<div className="col-1">

    <ul >
  {!user&&(<li className="nav-item">
<Link to="/Login" className="navbar-brand">
Login
</Link>
</li>)}
{user &&(
    <li className="nav-item">
<Link to="/Logout" className="navbar-brand">
Logout
</Link>
</li>
)}
</ul>
</div>



</div>
</nav>
</React.Fragment>)}}
export default NavBar