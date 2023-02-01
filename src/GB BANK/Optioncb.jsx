import React, { Component } from "react"; 
import Cheques from "./allchaq";
import queryString from "query-string";
class LeftPanelOptionscb extends Component {
    state={
       amount:["<10000",">10000"]
    }
    handleChange = (e) => {
        let { currentTarget: input } = e; 
        let options = {...this.props.options };
        options.page=1
        options[input.name] =input.value;
        console.log(options)
     
        this.props.onOptionChange(options)
        };
        updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ? inpValue.split(",") : [];
        let index1 = inpArr.findIndex((ele) => ele === value);
        if(index1>=0){inpArr.splice (index1, 1)}
        
        else if (checked) {inpArr.push(value);}
        else {
        let index = inpArr.findIndex((ele) => ele === value);
        console.log(index)
        if (index>=0) inpArr.splice (index, 1);
        
        }
        return inpArr.join(",")}
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
        makeCheckboxes = (arr, values, name, label) =>(
        <React.Fragment>
        <label className="form-check-label font-weight-bold "style ={{fontSize:"large"}}>{label}</label>
      
        {arr.map((opt) => (
        <div className="form-check m-2" style ={{fontSize:"large"}}>
          <hr />
        <input
        className="form-check-input"
        value={opt}
        type="radio"
        name={name}

         onChange={this.handleChange}/>
        <label className="form-check-label" style ={{fontSize:"large"}}>{opt}</label>
        </div>))}
        </React.Fragment>
        );

    render() {
            let{allOptions,options} = this.props;
        let { bank, amount='', } = options;
   this.state.bank=bank
        return (
        <div className="row border bg-light">
            <div className="col-12 text-center">
   
    </div>
        <div className="col-12 m-2">
       
      
       {this.makeCheckboxes(allOptions.bankName,bank,"bank","Bank")}
        </div>
 <div className="col-12 m-2">
        {this.makeCheckboxes(this.state.amount,amount, "amount", "Amount")}
        </div>
       
        </div>
        )}}
        export default LeftPanelOptionscb;