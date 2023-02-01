import React, { Component } from "react";
import {Link} from "react-router-dom";

import http from "./services/httpServer";
class Person extends Component{
    state = { students: [] };
    async componentDidMount() {
        let {id} = this.props.match.params;

        console.log("id",this.props.match.params
          )
        let response = await http.get(`/productApp/products/${id}`);
        console.log(id);
        let {data} = response;
        this.setState({ students: data });
        }
        render() {
          
          
        const { students } = this.state;
        return <div className="container">
        <h4>Details of the person</h4>
      Id :{  students.id}<br/>
        Name :{students.name}<br/>
        Price :{students.price}<br/>
     
  
        </div>
         
        }}
export default Person