let {authSys}  =("./src/TASK2/services/authSys");
let express = require("express");
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
let emp=[
    {empCode:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:" Male"},
    {empCode:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {empCode:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {empCode:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {empCode:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:
    "Male"},
    {empCode:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender
    :"Male"},
    {empCode:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {empCode:1606,name:"Julia",department:"HR",designation:"Manager",Trainee:25100,gender:"Female"},
    {empCode:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {empCode:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {empCode:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {empCode:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:
    "Male"},
    {empCode:1206,name:"Victoria",department:"HR",designation:"Manager",VP:65100,gender:"Female"},
    {empCode:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:
    "Female"},
    {empCode:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {empCode:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {empCode:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {empCode:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {empCode:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
    {empCode:1111,name:"MD NAFISH ALAM",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    ]
 let trac=[]
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
const cookieParser = require("cookie-parser");
app.use(cookieParser("abcdef-3477819"));

app.get("/tracker", function (req, res) {
    let { name } = req.body;
let userdata = req.signedCookies.userdata;;
console.log(`userdata: ${JSON.stringify(userdata)}`);
 if (!userdata) userdata = { user: "Guest", pages: [] };
userdata.pages.push({ url: "/login", date: Date.now() });
res.cookie("userdata", userdata, { maxAge: 30000, signed: true });
res.send(userdata);
});
app.get("/ ", function (req, res) {
let userdata = req.signedCookies.userdata;
console.log(`userdata : ${JSON.stringify(userdata)}`);
if (!userdata) userdata = { user: "Guest", pages: [] }; 
trac.push({ url: "/laptops", date: Date.now() })
res.cookie("userdata", userdata, { maxAge: 30000, signed: true });
;
res.send(trac);
});
app.post("/login", function (req, res) {
    let { name, empCode } = req.body;
    let userdata = emp.find((u) => u.name==name && u.empCode==empCode);
    console.log(userdata)
    if (!userdata) 
   { res.status(401).send("Login failed");
    console.log("kghj")}
     else{
       
    res.cookie("userdata", {user:name, pages: []}, { maxAge: 30000,signed: true});
    }
    res.send(userdata);
})
app.get("/logout", function (req, res) {
    
    res.clearCookie("userdata");
    
    res.send("clear Cookie");
})

app.get("/myJunior1", function (req, res) {
    let userdata = req.signedCookies.userdata;
console.log(`userdata: ${JSON.stringify(userdata)}`);
 if (!userdata) userdata = { user: "Guest", pages: [] };
userdata.pages.push({ url: "/myJuniors", date: Date.now() });
res.cookie("userdata", userdata, { maxAge: 30000, signed: true });
   res.send(emp)
    });
app.get("/myDetails", function (req, res) {

    let userdata = req.signedCookies.userdata;

    console.log(`userdata: ${JSON.stringify(userdata)}`);
     if (!userdata) userdata = { user: "Guest", pages: [] };
    userdata.pages.push({ url: "/tracker", date: Date.now() });
    res.cookie("userdata", userdata, { maxAge: 30000, signed: true })
   
console.log(userdata)
    if (!userdata )
    res.status(401).send("No access. Please login first");
    else{
    let u1 = emp.find((u) => u.name === userdata.name);
    if (u1) {
   
    res.send(u1);
    } else res.status(403).send("Forbidden");
    }
    });
app.get("/myJuniors", function (req, res) {
    let userdata = req.signedCookies.userdata;
console.log(userdata)
    if (!userdata )
    res.status(401).send("No access. Please login first");
    else{
    let u1 = emp.find((u) => u.name == userdata.name);
    console.log(u1)
    if (u1.designation==="VP") {
        let myJuniors = emp.filter((u) => u.designation==="Manager"|| u.designation==="Trainee");
    res.send(myJuniors);
    }
    if (u1 &&u1.designation==="Manager"){
        let myJuniors = emp.filter((u) =>u.designation==="Trainee");
        res.send(myJuniors);
    }
     else res.status(403).send("there is no junior ");
    }
    });

app.get("/company", function (req, res) {
  res.send(" Welcome to the Employee Portal of XYZ Company");
    
    });