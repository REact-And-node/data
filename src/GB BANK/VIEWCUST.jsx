import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
class CompA extends Component { 
  state = {Employees:[],pageInfo:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50]};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  let response = await http.get(`/getCustomers`);
  console.log("Employees",response);
  let {data} = response;
  this.setState({ Employees:data});}

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
    let searchString = this.makeSearchString(queryParams);
    let { page =1 } = queryParams;
    this.state.pageInfo.pageNumber=queryParams.page
    let newPage = +page + incr; 
    queryParams.page = newPage;
    this.callURL(`/allCustomer`, queryParams);
    };

   
    makeSearchString = (options) => {
      let {page, city, company, minAge } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "city", city);
      searchStr = this.addToQueryString(searchStr, "company", company);
      searchStr = this.addToQueryString(searchStr, "minAge", minAge);
      return searchStr;
      };
    
      addToQueryString = (str, paramName, paramValue)=> paramValue
      ? str
      ? `${str}&${paramName}=${paramValue}`
      : `${paramName}=${paramValue}`
      : str;
   
render() {
 
  const { cities, companies, ages,Employees} = this.state;
 let queryParams = queryString.parse(this.props.location.search)
  const user=authSys.getUser()
  let max=5
  let startindex=(queryParams.page-1)*max
 let page=1
 let HFSK={
 name: "Apoorv",
 gender: "Male",
 addressLine1: "New Ashok Nagar",
 state: "Uttar Pradesh",
 city: " Lucknow ",
 dob: "7-August-1996",
 PAN: "AQSON7890T"}
  let EndIndex=startindex>1?max+startindex:Employees.length<max+startindex?Employees.length-1:max
  let sty=Employees.filter((st,index)=>index>=startindex&&index<EndIndex)
  console.log(queryParams)

 EndIndex= EndIndex>Employees.length?EndIndex=Employees.length:max+startindex
   return (
  <div className="container">
  
  {startindex+1 +"  to   "+EndIndex +"  of  "+Employees.length}
  <div className="row">

    <div className="col-12">
    <div className="row text-center border " style ={{fontSize:"large"}}>
 
    <div className="col-2 "> <b>Name </b></div>
  <div className="col-2 "> <b>state</b></div>
  <div className="col-2 "> <b>city</b></div>
  <div className="col-2 "><b>PAN</b></div>
  <div className="col-2 "><b>dob</b></div>

  </div>
    
  {sty.map((pr,index) => (
    index%2? <div className="row text-center  border " key={pr.name} style ={{fontSize:"large"}}>
        <div className="col-2 ">{pr.name}</div>
  <div className="col-2 ">{pr.state}</div>
  <div className="col-2 ">{pr.city}</div>
  <div className="col-2 ">{pr.PAN}</div>
  <div className="col-2 ">{pr.dob}</div>
 
 
  </div>
      
      :
    <div className="row text-center bg-light border " key={pr.name} style ={{fontSize:"large"}}>
 
  
  <div className="col-2 ">{pr.name}</div>
  <div className="col-2 ">{pr.state}</div>
  <div className="col-2 ">{pr.city}</div>
  <div className="col-2 ">{pr.PAN}</div>
  <div className="col-2 ">{pr.dob}</div>
 
 
  </div>

  ))}
  <br />
  <div className="row"><div className="col-4">{startindex>0?<button className="btn btn-primary" onClick={()=>this.handlePage(-1)}> Prev</button>:""}</div>
  <div className="col-6"></div>
  <div className="col-2 text-right">{EndIndex>Employees.length-1?"":<button className="btn btn-primary" onClick={()=>this.handlePage(1)}> Next</button>}</div>
   </div>


  </div>
  </div>
  </div>);
}}
export default CompA