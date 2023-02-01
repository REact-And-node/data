import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
class Users extends Component { 
    state = {Employees:[]}
  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  let response = await http.get(`/myDetails`);
  console.log("Employees",response);
  let {data} = response;
  this.setState({ Employees: data});}

  componentDidMount(){
this.fetchData();}
Edit=()=>{

}
componentDidUpdate(prevProps, prevState){
if (prevProps!==this.props)this.fetchData();}
 
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
 
const user=authSys.getUser()

   return (
  <div className="container ">
  <h3><b className="text-danger">Empcode:</b>{user.empCode}</h3>
  <h3><b className="text-danger">name:</b>{user.name}</h3>
  <h3><b className="text-danger">gender:</b>{user.gender}</h3>
  <h3><b className="text-danger">department:</b>{user.department}</h3>
  <h3><b className="text-danger">designation:</b>{user.designation}</h3>
  <h3><b className="text-danger">salary:</b>{user.salary}</h3>
 
  

  </div>);
}}
export default Users