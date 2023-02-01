import React ,{Component} from "react";
import http from "./services/httpServer";
class ADDPerson extends Component{
    state = { person:{"id":"","name":"",
    "price":""},
    edit: false,
     read:""
};
async componentDidMount() {
this.fetchData();
}
async fetchData() {
    let {id} = this.props.match.params;
    console.log("id",this.props.match.params)
if (id) {
let response = await http.get(`/productApp/products/${id}`);
let {data} = response;

this.setState({ person:data, edit: true });
} else {
let person = {"id":"","name":"","price":""}

this.setState({ person: person, edit: false });
};}
    handleChange = (e) => { const { currentTarget: input } = e;
    let s1 = {...this.state };
    s1.person[input.name] = input.value;
    this.setState(s1);
    };
        async postData(url, obj) {
            try{
            let response = await http.post(url, obj);
             
            this.props.history.push("/products");
        } catch (ex) {
            if (ex. response && ex. response.status ==400) {
            let errors ={}
            errors.id = ex.response.data;
            this.setState({errors: errors });
            }
        }
            }
            componentDidUpdate(prevProps,prevState){
                if(prevProps!==this.props)
                this.fetchData()
            }
        async putData(url, obj) {
            let response = await http.put(url, obj);
             console.log(response);
            this.props.history.push("/products");
            }
            handleSubmit = (e) => {
            e.preventDefault();
            let { person, edit } = this.state;
             edit
? this.putData(`/productApp/products/${person.id}`, person) 
:this.postData("/productApp/products", person);}
    render(){

let {person,cities,read,grade,edit,errors=null} = this.state;
edit==true?read="readonly":read=""
console.log(person[0])
return (

<div className="container">
     <h5>{edit==true?"edit Details":"Enter Details of New product"}</h5>

<div className="form-group">



<label>Id</label>

<input

type="text"

id="name"

name="id"

className="form-control" placeholder="Enter  id" onChange={this.handleChange}
readOnly={read}
value={person.id}></input>
{errors && <span className="text-danger">{errors.id}</span>}
<br />


<label>Name</label>

<input

type="text"

id="name"

name="name"

className="form-control" placeholder="Enter  name" onChange={this.handleChange}

value={person.name}></input>
<br />
<label>Price</label>

<input

type="text"

id="salary"

name="price"

className="form-control" placeholder="Enter  price" onChange={this.handleChange}

value={person.price}></input>
<br />


<button className="btn btn-primary" onClick={this.handleSubmit}>{this.props.edit?"Update":"Submit"}</button>
</div>
</div>)
    }
}
export default ADDPerson;