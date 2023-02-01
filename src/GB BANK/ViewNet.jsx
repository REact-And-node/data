import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
import LeftPanelOptionscb from "./Optioncb";
class ViewNet extends Component { 
  state = {Employees:[],pageInfo:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50]};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  const user=authSys.getUser()
  let response = await http.get(`/getNetBankingByName/${user.name}`);
  console.log("Employees",response);
  let {data} = response;
  this.setState({ Employees:data.items});}

  componentDidMount(){
this.fetchData();}
Edit=()=>{

}
componentDidUpdate(prevProps, prevState){
if (prevProps!==this.props)this.fetchData();}
 callURL= (url, options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({ pathname: url, search: searchString.toString()})
    }
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);

    let { page =1 } = queryParams;
    let newPage = +page + incr; 
    queryParams.page = newPage;
    this.callURL(`/ViewNet`, queryParams);
    };
    
   

    filterParam = (arr, name, values) => {

        if (!values) return arr;
        let valuesArr = values.split(",");
        
        let arr1 = arr.filter((a1) => valuesArr.find((val) => val.bankName === a1.bank));
        
        return arr1;
        
        };
    makeAllOptions= (arr) => {

        let json = {};
     
       json.bankName = this.getDifferentValues(arr, "bankName");
      
        return json;}
    
      makeAllOptions1= (arr) => {
  
        let json = {};
        json.productName= this.getDifferentValues(arr, "productName");
        json.productId= this.getDifferentValues(arr, "productId");
      
      
        return json;}
        callURL= (url, options) => {
          let searchString = this.makeSearchString(options);
          this.props.history.push({ pathname: url, search: searchString.toString(",")})
          }
        getDifferentValues = (arr, name) =>
        arr.reduce(
            (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc: [...acc, curr[name]],[]
        );
    makeSearchString = (options) => {
      let {page, bank, amount, minAge } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "bank", bank);
      searchStr = this.addToQueryString(searchStr, "amount", amount);
      searchStr = this.addToQueryString(searchStr, "minAge", minAge);
      return searchStr;
      };
    
      addToQueryString = (str, paramName, paramValue)=> paramValue
      ? str
      ? `${str}&${paramName}=${paramValue}`
      : `${paramName}=${paramValue}`
      : str;
      handleOptionChange = (options) => { 
  
        this.callURL("/allNet", options);
    };
render() {
 
  const { cities, companies, ages,Employees} = this.state;
  let allOptions=this.makeAllOptions(Employees)
  console.log(allOptions)
 let queryParams = queryString.parse(this.props.location.search)
 
  const user=authSys.getUser()
  let max=5
  let startindex=(queryParams.page-1)*max
 let page=1

  let EndIndex=Employees.length<max+startindex?Employees.length:startindex+max
  // EndIndex=EndIndex >Employees.length?EndIndex=Employees.length:max+startindex

console.log(EndIndex)

 
  
 console.log(Employees.length)

  let sty=Employees.filter((st,index)=>index>=startindex&&index<EndIndex) 
   console.log(sty)

   return (
  <div className="container">
  <div className="row">
    
  
    <div className="col-2"></div>
     
    <div className="col-10">
       <h2>All Net Banking Details</h2>
        {Employees.length===0?<h1 className="text-danger">No Transactions to show</h1>:<React.Fragment>
   <b style ={{fontSize:"large"}}>
  {startindex+1 +"  -  "+EndIndex +"  of  "+Employees.length}
</b>
<br />
  
    <div className="row text-center border " style ={{fontSize:"large"}}>
 
  <div className="col-3 "> <b>payeeName</b></div>
  <div className="col-3 "> <b>bankName</b></div>
  
  <div className="col-3 "><b>amount</b></div>
<div className="col-3 "><b>comment</b></div>
  </div>
 </React.Fragment> }
    
  {sty.map((pr,index) => (
    index%2? <div className="row text-center  border " key={index} style ={{fontSize:"large"}}>
       
  <div className="col-3 ">{pr.payeeName}</div>
  <div className="col-3 ">{pr.bankName}</div>
 
  <div className="col-3 ">{pr.amount}</div>
  <div className="col-3 ">{pr.comment}</div>
 
  </div>
      
      :
    <div className="row text-center bg-light border " key={index} style ={{fontSize:"large"}}>
 
  
  <div className="col-3 ">{pr.payeeName}</div>
  <div className="col-3 ">{pr.bankName}</div>
 
  <div className="col-3 ">{pr.amount}</div>
  <div className="col-3 ">{pr.comment}</div>
 
  </div>

  ))}
  <br />
  <div className="row"><div className="col-4">{startindex>0?<button className="btn btn-secondary" onClick={()=>this.handlePage(-1)}> Prev</button>:""}</div>
  <div className="col-6"></div>
  <div className="col-2 text-right">{EndIndex==Employees.length?"":<button className="btn btn-secondary" onClick={()=>this.handlePage(1)}> Next</button>}</div>
   </div>


  </div>
  </div>
  </div>);
}}
export default ViewNet