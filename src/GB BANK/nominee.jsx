import React ,{Component} from "react";
import authSys from "./services/authSys";
import http from "./services/httpServer";

class Hello2 extends Component{
    state ={statecity:[],cityArr11:[],
         form:{years:"",month:"",day:"" ,code:"",jointsignatory:false},
         month:['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         date:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         date1:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
         date2:[],
         date3:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
         year:["1990", "1991", "1992",
          "1993", "1994", "1995", "1996",
           "1997", "1998", "1999", "2000",
            "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", 
            "2012", "2013",
          "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
          form:{},
         
          disabled:"",
          read:""
    };
    handleChange = (e) => {

      console.log(e.currentTarget);
     
      let s1 = { ...this.state };
    
       s1.form[e.currentTarget.name]=e.currentTarget.value;
       s1.form.years==""||s1.form.month==""||s1.form.years=="Select Year"||s1.form.month=="Select Month"||s1.form=={}?s1.date2=[]:
       s1.form.month=="Mar"||s1.form.month=="Jan"||s1.form.month=="May"||s1.form.month=="Jul"||s1.form.month=="Aug"||
       s1.form.month=="Oct"||s1.form.month=="Dec"?s1.date2=s1.date:
       s1.form.month=="Apr"||
       s1.form.month=="Jun"||s1.form.month=="Sep"||s1.form.month=="Nov"?s1.date2=s1.date1:
       s1.form.month==="Feb"&& s1.form.year%4===0?s1.date2=s1.date3
       :s1.date2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
       console.log(s1.form.year,s1.form.year%4)
      this.setState(s1);
    
      
      };
      
  async fetchData() {
 const user=authSys.getUser()
   
    let response1 = await http.get(`/getNominee/${user.name}`);
   console.log("customerDetails",response1);
  let {data}=response1
     let dob=data.dob.split("-")
     data===""?this.state.cityArr11=[]:this.state.cityArr11=[]
     data===""?this.state.disabled="":this.state.disabled="disabled"
     data===""?this.state.read="":this.state.read="readonly"
     data===""?this.state.date2=[]:this.state.date2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
   console.log(dob)
let day=dob[0]
let month=dob[1]
let  year=dob[2]
     this.state.form={...data,day:day,month:month,year:year}

    this.setState(this.state);}
  
    componentDidMount(){
  this.fetchData();}
  Edit=()=>{
  
  }
  componentDidUpdate(prevProps, prevState){
  if (prevProps!==this.props)this.fetchData();}
      makeDropdown = (arr, values, name, label) =>(
        <div className="form-group">
        <select
        className="form-control"
        onChange={this.handleChange}
        name={name}
       >
            
        <option value="">{label}</option>
        {arr.map((opt) => (
        <option  
        value={opt}
        name={name}
         onChange={this.handleChange}>{opt}</option>
        ))}
        </select>
        </div>
        )
        async postData(url, obj) {
          
          let response = await http.post(url, obj);
         window.location="/customer"
      } 
      isValid = (errors) => {
   
        let keys = Object.keys(errors); 
      
        let count = keys.reduce((acc, curr) => (errors [curr] ? acc + 1 : acc), 0); 
          return count == 0;};
      validateAll = () => {
          
        let { nomineeName, gender, year,day,month,relationship, } = this.state.form;
        let errors = {};
        
         errors.gender = !gender?"gender is required":"";
         errors.nomineeName = !nomineeName?"name is required":"";
         
         errors.relationship = !relationship?"relationship is required":"";
         errors.day = !day?"day is required":"";
         errors.year = !year?"year is required":"";
         errors.month = !month?"month is required":"";
      
        return errors;
        };
        handleSubmit = (e) => {
          e.preventDefault();
          let errors=this.validateAll()
          const user=authSys.getUser()
          if(this.isValid(errors)){
           let s1 = { ...this.state };
           let za=false
           s1.form.jointsignatory=="true"?za=true:za=false
           const custDet = {
            name:user.name,
            nomineeName:s1.form.nomineeName,
            gender: s1.form.gender,
           jointsignatory:za,
            dob: s1.form.day+"-"+s1.form.month+"-"+s1.form.year,
            relationship: s1.form.relationship,
          
          };
          console.log(custDet)
          this.postData("/nomineeDetails", custDet)
          
         alert("successfully added  CUSTOMER'S nominee details")
         s1.read=""
         s1.errors={}
         this.setState(s1)}
        else{
         let s1={...this.state}
         s1.errors=errors
        
         this.setState(s1)
        }
          };
      form=()=>{
        let {form,statecity,cityArr11=[],state_arr}=this.state

        const currentYear = (new Date()).getFullYear();
        const range = Array.from({ length: (- 60 - currentYear) / -1 + 1}, (_, i) => currentYear + (i * -1));
   
        this.state.year=range
return(<React.Fragment>
    <div className="row">
<div className="col-12"><h3>Name<b className="text-danger">*</b></h3></div>

     </div> 
<div className="row">

<div className="col-12"> 
 <input
   type="text"
    className="form-control"
    id="email ID"
    name="nomineeName" 
    placeholder="Enter nominee name "
    value={form.nomineeName}
    onChange={this.handleChange}
    readOnly={this.state.read}
    />
  
    </div>
   
   </div>
   <br /> <br />
<div className="row">
  <div className="col-2" style ={{fontSize:"Medium"}} onChange={this.handleChange}><b>Gender<b className="text-danger" >*</b></b></div>
  <div className="col-4" style ={{fontSize:"Medium"}}><b>{form.gender==="Male"?<input type="radio" name="gender" id="" value={"Male"} checked={form.gender==="Male"} onChange={this.handleChange} disabled={this.state.disabled}/>:
  <input type="radio" name="gender" id="" value={"Male"}  onChange={this.handleChange} />} Male</b></div>
  <div className="col-4" style ={{fontSize:"Medium"}}><b>{form.gender==="Female"?
  <input type="radio" name="gender" id="" value="Female" checked={form.gender==="Female"} onChange={this.handleChange} disabled={this.state.disabled}/>:
  <input type="radio" name="gender" id="" value="Female"  onChange={this.handleChange}/>}Female</b></div>

</div>
<hr/>
<div className="row">
<div className="col-12" style ={{fontSize:"Medium",padding:"1%"}}><b>Date of Birth<b className="text-danger">*</b></b></div>
  <div className="col-4" style ={{fontSize:"Medium",padding:"1%"}}>
    <select  class=" form-select bg-light" name="year"  value={this.state.form.year} onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} disabled={this.state.disabled}>
<option selected dasibled>Select Year</option>

     {
       this.state.year.map((year, index) => {
         return <option key={`year${index}`} value={year}>{year}</option>
       })
     }
    </select>
  </div>
  <div className="col-4" style ={{fontSize:"Medium",padding:"1%"}}>
<select  className=" form-select bg-light" name="month"  value={this.state.form.month} onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} disabled={this.state.disabled}>
  <option selected dasibled>Select Month</option>
     {
       this.state.month.map((month, index) => {
         return <option  value={month}>{month}</option>
       })
     }
    </select>
  </div>
  <div className="col-4" style ={{fontSize:"Medium",padding:"1%"}}>
  <select  className=" form-select bg-light" name="day"  value={this.state.form.day} onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} disabled={this.state.disabled}>
  <option selected dasibled>Select DAY</option>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
     {this.state.date2.map((Day, index) => {
        return <option  value={Day}>{Day}</option>})
     }
    </select>
  </div>
  <br />
  <br />
  <br />
     
  <hr/>
<div className="row">
<div className="col-12"><h3>Relationship<b className="text-danger">*</b></h3></div>

     </div> 
<div className="row">

<div className="col-12"> 
 <input
   type="text"
    className="form-control"
    id="email ID"
    name="relationship" 
    placeholder="Enter your Pan "
    value={form.relationship}
    onChange={this.handleChange}
    readOnly={this.state.read}
    />
  
    </div>
   
   </div>
   <br /> <br />
   <br /> <br />
  
<div className="row">
    <div className="col-1 text-right">
   { form.jointsignatory==true?
        <input type="checkbox" value={true} name="jointsignatory" checked={form.jointsignatory===true} onChange={this.handleChange}/> :
        <input type="checkbox" value={true} name="jointsignatory" onChange={this.handleChange}/> 
         }
    </div>
    <div className="col-2 text-left">
         <b>joints ignatory</b>
    </div>
</div>
</div>

{ this.state.read==""? <button className="btn btn-primary m-3"  onClick={this.handleSubmit}>submit</button>:""}

</React.Fragment>)
      }
    render(){

return<React.Fragment>


  {this.form()}

</React.Fragment>



   
}}
export default Hello2;