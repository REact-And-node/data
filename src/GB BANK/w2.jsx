import React, { Component } from "react"; 
import  bank from "./image/bank.png"
class NotAllowed2 extends Component {
    render() {
    return (
    <div className="container">
       <div className="row">
       <div className="col-3"></div>
       <div className="col-8"><h1 className="text-danger">Welcome to GBI BANK  Customer Portal</h1></div>
       <div className="col-2"></div>
       
        </div>
       <div className="row">
       <div className="col-4"></div>
       <div className="col-4" ><img src={bank} alt="bank" style={{height:"300px"}}/></div>
       <div className="col-4"></div>
       
        </div>
    
    </div>
    );
    }}
    export default NotAllowed2;