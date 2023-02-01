import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
class CompA extends Component { 
  state = {Employees:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50]};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  let response = await http.get(`/company`);
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

    
    
render() {
 
   return (<h1>
    {this.state.Employees}
   </h1>
    );
}}
export default CompA