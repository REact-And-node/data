import React, { Component } from "react";
import {Link} from "react-router-dom";
class NavBar extends Component {
render() {
    let {user}=this.props
    let names = [{tittle:"Add Customer",val:"addcustomer"},{tittle:"view All  Customer",val:"allCustomer"}];
    let names1 = [{tittle:"Cheques",val:"Cheques"},{tittle:"Net Banking",val:"allNet"}];
    let names2 = [{tittle:"Cheques",val:"viewCheques"},{tittle:"Net Banking",val:"viewNet"}];
    let customerDetails = [{tittle:"customerDetails",val:"customerDetails"},{tittle:"nomineeDetails",val:"nomineeDetails"}];
    let payee = ["Add Payee",
        "Cheque",
        "NetBanking"];
   
return (<React.Fragment>


<nav className="navbar navbar-expand-sm navbar-warning bg-warning ">
<div className="col-10">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
<Link to="/" className="navbar-brand">
HOME
</Link>

</li>
{user && user.role=="customer"&&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>view</b>
</a>
<div className="dropdown-menu">
{names2.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1.val}?page=1`}>
{n1.tittle}
</Link>
))}
</div>
</li>
)}
{user && user.role=="customer"&&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>Details</b>
</a>
<div className="dropdown-menu">
{customerDetails.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1.val}`}>
{n1.tittle}
</Link>
))}
</div>
</li>
)}
{user && user.role=="customer"&&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>Transaction</b>
</a>
<div className="dropdown-menu">
{payee.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1}`}>
{n1}
</Link>
))}
</div>
</li>
)}
{user && user.role=="manager"&&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>Customers</b>
</a>
<div className="dropdown-menu">
{names.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1.val}?page=1`}>
{n1.tittle}
</Link>
))}
</div>
</li>
)}
{user && user.role=="manager"&&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>Transactions</b>
</a>
<div className="dropdown-menu">
{names1.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1.val}?page=1`}>
{n1.tittle}
</Link>
))}
</div>
</li>
)}
{!user&&(<li className="nav-item">
<Link to="/Login" className="navbar-brand">
Login
</Link>
</li>)}
</ul>
</div>
<div className="col-2">
<ul className="navbar-nav mr-auto">
{user&&(<li className="nav-item">
<Link to="/" className="navbar-brand">
Welcome {user.name}
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


</nav>
</React.Fragment>)}}
export default NavBar