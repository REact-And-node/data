import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
 class Login extends Component {
state = {
form: { name: "", empCode:""}
};

async postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    let {data}=response
authSys.login(data)
 window.location="/welcome";
} 
     catch (ex) {
    if (ex.response && ex.response.status==401){
    let errors={}; 
    errors.name = ex.response.data;
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
    let { name, empCode } = this.state.form;
    let {errors=null} = this.state;
    return (
    <div className="container">
    <div className="form-group">
    {errors && errors.name && <h1><span className="text-danger">{errors.name}</span></h1>}
    <label>Username</label>
    <input
    type="text"
    className="form-control"
    id="name"
    name="name" 
    placeholder="Enter Username"
    value={name}
    onChange={this.handleChange}
    />

    </div>
   
    <div className="form-group">
    <label>Password</label>
    <input
    type="empCode"
    className="form-control" id="empCode" name="empCode" placeholder="Enter empCode" value={empCode} onChange={this.handleChange} />
     </div>
     {errors && errors.empCode &&<span className="text-danger">{errors.empCode}</span>}
     <br />
     <button className="btn btn-primary" onClick={this.handleSubmit}>{this.props.edit?"Update":"Submit"}</button>
     </div>
)}}
export default Login