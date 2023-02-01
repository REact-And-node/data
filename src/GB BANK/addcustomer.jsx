import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
 class ADDEmp extends Component {
state = {
form: { name:"",email: "", password:"",password1:""},
errors:{name:"",
email:"",password:"",
password1:""},
match:"",
errors1:""
,

errors2:""
,
read:""
};

async postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    window.location="/admin"
} 
     catch (ex) {
    if (ex.response && ex.response.status===400){
    let errors2={}; 
    errors2.email= ex.response.data;
    this.setState({errors2: errors2 });
    }
   else if (ex.response && ex.response.status===200){
    let errors2={}; 
    errors2.email= ex.response.data;
    this.setState({errors2: errors2 });
    }
}
    }
  handleChange = (e) =>{
const { currentTarget: input } = e;
let s1 = {...this.state };

s1.form[input.name] = input.value;
s1.form.password===s1.form.password1?s1.match="match":s1.match=""
console.log(s1.match)
this.setState(s1)
  }
  isValid = (errors) => {
   
     let keys = Object.keys(errors); 
   
     let count = keys.reduce((acc, curr) => (errors [curr] ? acc + 1 : acc), 0); 
       return count == 0;};

   zz = (email) => {
     return email.match(
       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     );
   };
    validatePassword=(p)=>p.length < 8?"Your password must be at least 8 characters":(p.search(/[a-z]/i) < 0)?
         "Your password must contain at least one letter[a-z].":(p.search(/[A-Z]/i) < 0) ?"Your password must contain at least one letter[A-Z].":(p.search(/[0-9]/) < 0)
          ?"Your password must contain at least one digit[0-9]." 
:""
 
              
            Validatename=(name)=>!name?"Name should have at least 8 characters":name.length<8?"Name should have at least 8 characters":"";

 Validatepassword=(password)=>password.length<8?"Password should be min. 8 chars with a lowercase, uppercase and digit":(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(password)?"Password should be min. 8 chars with a lowercase, uppercase and digit":"";



 validateAll = () => {
          
          let { name, password,password1} = this.state.form;
          let errors = {};
           errors.name = this.Validatename(name);
        
           errors.password = this.validatePassword(password);
           errors.password1 = this.state.match==="match"?"":"Passwords do not match";
          return errors;
          };
        
handleSubmit = (e) => {
     e.preventDefault();
     let errors=this.validateAll()
     if(this.isValid(errors)){
      let s1 = { ...this.state };
     this.postData("/register", this.state.form)
     s1.errors={}  
    alert("successfully added  CUSTOMER")
    s1.read=""
  
    this.setState(s1)}
   else{
    let s1={...this.state}
    s1.errors=errors
    this.setState(s1)
   }
     };
render() {
    let {name, email, password ,password1} = this.state.form;
    let {errors,errors2=null,errors1=null} = this.state;
  
    return (<React.Fragment>
      
    <div className="container bg-light">
    <div className="form-group">
      
      <br />
     
   
     
      <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>NEW Coustomer</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-9"><h3>{errors2=={}||errors2==""?<span className="text-danger"><h3>{errors1}</h3></span>:<span className="text-danger"><h3>{errors2.email}</h3></span>}</h3></div>
</div>
    
     
<div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>Name</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
<div className="row">
<div className="col-2"></div>
<div className="col-1 text-right"> <h3></h3> </div>
<div className="col-8"> 
 <input
   type="text"
    className="form-control"
    id="email ID"
    name="name" 
    placeholder="Enter your name "
    value={name}
    onChange={this.handleChange}
    />
   {errors.name?(<span className="text-danger">{errors.name}</span>):("")}
    </div>
   
   </div>
   <br /><br />
   <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>Password</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-2"></div>
<div className="col-1 "> <h2></h2></div>
<div className="col-8"> 
    
  
    <input
    type="password"
    className="form-control" id="password" name="password" placeholder="Enter the Password" value={password} onChange={this.handleChange} />
    {errors.password?<span className="text-danger">{errors.password}</span>:""}
     </div>
     </div>
   <br /><br />
   <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>Confirm Password</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>
<div className="col-2 text-right"> <h2></h2></div>
<div className="col-8"> 
    
  
    <input
    type="password"
    className="form-control" id="password" name="password1" placeholder="Re-Enter the Password" value={password1} onChange={this.handleChange} />
       {errors.password1?<span className="text-danger">{errors.password1}</span>:""}
     </div>
     </div>
   
   
     <br />
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><button className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.read}>Create</button></div>
</div>
<div className="col-6"><h3></h3></div>
     </div> 
     
     
  
     </div>
</React.Fragment>)}}
export default ADDEmp