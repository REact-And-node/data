import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";

class myJuniors extends Component { 
  state = {Employees:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50]};

  async fetchData() {
const user=authSys.getUser()
console.log(user)
  let response = await http.get(`/myJunior1`);
  console.log("Employees",response);
  let {data} = response;
  this.setState({ Employees: data});}

  componentDidMount(){
this.fetchData();}
Edit=()=>{

}
componentDidUpdate(prevProps, prevState){
if (prevProps!==this.props)this.fetchData();}
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParams;
    let newPage = +page + incr; queryParams.page = newPage;
    this.callURL("/Employees", queryParams);
    };
    callURL= (url, options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({ pathname: url, search: searchString,})
    }
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
      handleOptionChange= (options)=>{
        this.callURL("/Employees", options)
      }
render() {
 
  const { cities, companies, ages,Employees } = this.state;
  let queryParams = queryString.parse(this.props.location.search)
  const user=authSys.getUser()
let su=user.designation==="VP"?Employees.filter((u) => u.designation==="Manager"|| u.designation==="Trainee"):
user.designation==="Manager"?
 Employees.filter((u) =>u.designation==="Trainee"):"there is no junior"

   return (
  <div className="container">
  <h4> List of Employees</h4>
 
  <div className="row">
 
    <div className="col-12">

    
  {su.map((pr) => (
  <div className="row text-center" key={pr.empCode}>
  <div className="col-2 border">{pr.empCode}</div>
  <div className="col-2 border">{pr.name}</div>
  <div className="col-2 border">{pr.department}</div>
  <div className="col-2 border">{pr.designation}</div>
  <div className="col-2 border">{pr.salary}</div>

  </div>

  ))}

  </div>
  </div>
  </div>);
}}
export default myJuniors