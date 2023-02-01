import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
 class Login extends Component {
state = {
form: { name: "", password:""},
errors:""
};

async postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    let {data}=response
    console.log(data)
authSys.login(data)
const user=authSys.getUser()

{user.role=="manager"?this.props.history.push("/admin"):this.props.history.push("/customer")}
user.role=="manager"? window.location="/admin": window.location="/customer"
 
} 
     catch (ex) {
    if (ex.response && ex.response.status==500){
    let errors={}; 
    errors.name= "Login Failed. Check the username and password";
    this.setState({errors: errors });
    }
}
    }
  handleChange = (e) =>{
const { currentTarget: input } = e;
let s1 = {...this.state };
s1.form[input.name] = input.value;
this.setState(s1)
  }
handleSubmit = (e) => {
e.preventDefault();

this.postData("/login", this.state.form);
}
render() {
    let {name, password } = this.state.form;
    let {errors=null} = this.state;
    return (
    <div className="container">
    <div className="form-group">
      
      
      <div className="row">
<div className="col-4"><h3></h3></div>
<div className="col-3"><h1>Welcome to GBI BANK</h1>
{errors && errors.name && <span className="text-danger"><b><h3>{errors.name}</h3></b></span>}</div>
<div className="col-4"><h3></h3></div>

     </div><br />
      <div className="row">
<div className="col-5"><h3></h3></div>
<div className="col-3"><h4>USERNAME:</h4></div>
<div className="col-4"><h3></h3></div>
     </div>
      <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-6"><b>
     </b></div>
<div className="col-3"><h3></h3></div>
     </div>
     
<div className="row">
<div className="col-3"></div>

<div className="col-5"> 
 <input
   type="text"
    className="form-control"
    id="name"
    name="name" 
    placeholder="Enter your USERNAME"
    value={name}
    onChange={this.handleChange}
    />
<h4 className="text-secondary">We'll never share your user name with anyone else.</h4>
    </div>
    <div className="col-3 text-right">  </div>
   </div>
   <br /><br />
   <div className="row">
<div className="col-5"><h3></h3></div>
<div className="col-3"><h4>Password:</h4></div>
<div className="col-4"><h3></h3></div>
     </div>
   <div className="row">
<div className="col-3"></div>

<div className="col-5"> 
    
  
    <input
    type="password"
    className="form-control" id="password" name="password" placeholder="Enter password" value={password} onChange={this.handleChange} />
     </div>
     <div className="col-2 text-right"></div>
     </div>
   
   
     <br />
     <div className="row">
<div className="col-5"></div>
<div className="col-4"><button className="btn btn-primary" onClick={this.handleSubmit}>{this.props.edit?"Update":"Submit"}</button></div>
<div className="col-3"></div>
     </div>
     </div>
     
  
     </div>
)}}
export default Login