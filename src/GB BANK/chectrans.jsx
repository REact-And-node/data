import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
 class CT extends Component {
state = {
form: { name:"",email: "", password:"",amount:""},
errors:{name:"",
email:"",password:"",
amount:""},
match:"",
errors1:""
,
bank:[],
errors2:""
,
read:""
};
   
async fetchData() {
    const user=authSys.getUser()
      
       let response1 = await http.get(`/getBanks`);
      console.log("customerDetails",response1);
   
   this.state.bank=response1.data
       this.setState(this.state);}
     
       componentDidMount(){
     this.fetchData();}
     Edit=()=>{
     
     }
     componentDidUpdate(prevProps, prevState){
     if (prevProps!==this.props)this.fetchData();}
async postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    window.location="/customer"
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
s1.form.password===s1.form.amount?s1.match="match":s1.match=""
console.log(s1.match)
this.setState(s1)
  }
  isValid = (errors) => {
   
     let keys = Object.keys(errors); 
   
     let count = keys.reduce((acc, curr) => (errors [curr] ? acc + 1 : acc), 0); 
       return count == 0;};

   
              
            Validatename=(name)=>!name?"Name should have at least 8 characters":name.length<8?"Name should have at least 8 characters":"";

            validatebranch=(branch)=>!branch?"branch should have characters ":"";



 validateAll = () => {
          
          let { bankName, branch,amount,chequeNumber} = this.state.form;
          let errors = {};
           errors.bankName = !bankName?"bankName is required":"";
           errors.chequeNumber =(/^\s*-?[0-9]{11,20}\s*$/).test(chequeNumber)?"":"chequeNumber should have at least 11 characters";
        
           errors.branch = this.validatebranch(branch);
           errors.amount = !amount?"amount is required":"";
          return errors;
          };
        
handleSubmit = (e) => {
     e.preventDefault();
     let errors=this.validateAll()
     const user=authSys.getUser()
     if(this.isValid(errors)){
      let s1 = { ...this.state };
      let csr={...s1.form,name:user.name}
     this.postData("/postCheque", csr)
     
    alert("successfully added  cheque details")
    s1.read=""
    s1.errors={}
    this.setState(s1)}
   else{
    let s1={...this.state}
    s1.errors=errors
    this.setState(s1)
   }
     };
render() {
    let {chequeNumber, email, password ,amount} = this.state.form;
    let {errors,errors2=null,errors1=null} = this.state;
  
    return (<React.Fragment>
      
    <div className="container bg-light">
    <div className="form-group">
      
      <br />
     
   
     
      <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>Deposit cheque </h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-9"><h3>{errors2=={}||errors2==""?<span className="text-danger"><h3>{errors1}</h3></span>:<span className="text-danger"><h3>{errors2.email}</h3></span>}</h3></div>
</div>
    
     
<div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Cheque Number<b className="text-danger">*</b>
</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
<div className="row">
<div className="col-1"></div>

<div className="col-11"> 
 <input
   type="text"
    className="form-control"
    id="email ID"
    name="chequeNumber" 
    placeholder="Enter your chequeNumber "
    value={chequeNumber}
    onChange={this.handleChange}
    />
   {errors.chequeNumber?(<span className="text-danger">{errors.chequeNumber}</span>):("")} 
   <br />
   <br /> 
   <hr /> 
    </div>
   
   </div>
   <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Bank<b className="text-danger">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<select  className=" form-select bg-light" name="bankName"    onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} >
<option selected dasibled>Select state</option>

     {
       this.state.bank.map((st, index) => {
         return <option  value={st}>{st}</option>
       })
     }
    </select>
    {errors.bankName?<span className="text-danger">{errors.bankName}</span>:""}
     <br /><br />
   <hr />
    </div>
     </div>
   <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>branch<b className="text-danger">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
    
  
    <input
    type="text"
    className="form-control" id="branch" name="branch" placeholder="Enter the branch"  onChange={this.handleChange} />
    {errors.branch?<span className="text-danger">{errors.branch}</span>:""}
     <br /><br />
   <hr />
    </div>
     </div>
  
   <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Amount<b className="text-danger">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
    
  
    <input
    type="text"
    className="form-control" id="password" name="amount" placeholder="Enter the amount"  onChange={this.handleChange} />
       {errors.amount?<span className="text-danger">{errors.amount}</span>:""}
       <br /><br />
        <hr />
     </div>
     </div>
    
   
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><button className="btn btn-primary" onClick={this.handleSubmit} >Add Cheque</button></div>
</div>
<div className="col-6"><h3></h3></div>
     </div> 
     
   
  
     </div>
</React.Fragment>)}}
export default CT