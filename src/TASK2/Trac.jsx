import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
class CompC extends Component { 
  state = {};

  async fetchData() {
  const user1=authSys.getUser()
  let response = await http.get(`/tracker`);
  console.log("Employees",response);
  let {data} = response;
  if(!user1){
    let d={...data}
    this.state.Employees=JSON.stringify(d)
  }
  else{
let d={user:user1.name,...data.pages}
this.state.Employees=JSON.stringify(d)
}

  this.setState(this.state);}

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
export default CompC