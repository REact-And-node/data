import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
 class NetPayee extends Component {
state = {
form: { },
errors:{name:"",
email:"",password:"",
amount:""},
match:"",
errors1:""
,
Payees:[],
errors2:""
,
read:"",
ba:[{t1:"same bank",val:"SBI"},{t1:"other bank",val:"GBI"}]
};
   
async fetchData() {
    const user=authSys.getUser()
      
       let response1 = await http.get(`/getPayees/${user.name}`);
      console.log("customerDetails",response1);
   
   this.state.Payees=response1.data
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


this.setState(s1)
  }
  isValid = (errors) => {
   
     let keys = Object.keys(errors); 
   
     let count = keys.reduce((acc, curr) => (errors [curr] ? acc + 1 : acc), 0); 
       return count == 0;};

   
              
            Validatename=(name)=>!name?"Name should have at least 8 characters":name.length<8?"Name should have at least 8 characters":"";

            validatebranch=(branch)=>!branch?"branch should have characters ":"";



 validateAll = () => {
          
          let { amount, comment,payeeName} = this.state.form;
          let errors = {};
           errors.payeeName = !payeeName?"payeeName is required":"";
           errors.amount =(amount)?"":"Account Number should have at least 10 characters";
           errors.comment =(comment)?"":"bank TYPE should REQUIRED";
        
          
          return errors;
          };
        
handleSubmit = (e) => {
     e.preventDefault();
     let errors=this.validateAll()
     const user=authSys.getUser()
     if(this.isValid(errors)){
      let s1 = { ...this.state };
      let bank=s1.Payees.find((st)=>st.payeeName==s1.form.payeeName)
    
      let csr={...s1.form,name:user.name,bankName:bank.bankName}
     this.postData("/postNet", csr)
     
    alert("successfully added  Transaction details")
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
    let {payeeName, email, password ,amount} = this.state.form;
    let {errors,errors2=null,errors1=null} = this.state;
  
    return (<React.Fragment>
      
    <div className="container bg-light">
    <div className="form-group">
      
      <br />
     
   
     
      <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><h3>Add Payee </h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-9"><h3>{errors2=={}||errors2==""?<span className="text-danger"><h3>{errors1}</h3></span>:<span className="text-danger"><h3>{errors2.email}</h3></span>}</h3></div>
</div>
    
     
<div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Payee Name<b className="text-danger">*</b>
</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
<div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<select  className=" form-select bg-light" name="payeeName"    onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} >
<option selected dasibled>Select payeeName</option>

     {
       this.state.Payees.map((st, index) => {
         return <option  value={st.payeeName}>{st.payeeName}</option>
       })
     }
    </select>
   {errors.payeeName?(<span className="text-danger">{errors.payeeName}</span>):("")} 
   <br />
  
    </div>
   
   </div>
   <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Amount<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="amount" 
    placeholder="Enter your amount "
   
    onChange={this.handleChange}
    />

    {errors.amount?<span className="text-danger bg-light">{errors.amount}</span>:""}
     <br /><br />
   
    </div>

     </div>
     <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>comment<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div>
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="comment" 
    placeholder="Enter your commint "
   
    onChange={this.handleChange}
    />

    {errors.comment?<span className="text-danger bg-light">{errors.comment}</span>:""}
     <br /><br />
   
    </div>
     </div>
   
     
    
   
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-3"><button className="btn btn-primary" onClick={this.handleSubmit} >Add Transaction</button></div>
</div>
<div className="col-6"><h3></h3></div>
     </div> 
     
   
  
     </div>
</React.Fragment>)}}
export default NetPayee