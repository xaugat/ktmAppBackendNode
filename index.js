const express = require( 'express');
const  mysql = require( 'mysql');
const path =  require( 'path');
const session = require('express-session');


var app = express();



var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'saugat12',
  database: 'ktmApp',
  port: '3306'
});


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, 'login.html'));
})


app.get('/home', function(req, res){
  res.sendFile(path.join(__dirname, 'home.html'));
})


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

con.connect(function(err) {
  if(err){
    console.log(err)
  }
   
    console.log("Connected!");
    // var sql = "CREATE TABLE users (name VARCHAR(255), address VARCHAR(255), mobile VARCHAR(255), profession VARCHAR(255), hobbies VARCHAR (255), email VARCHAR (255), password VARCHAR (255));";
    // console.log(sql);
    
    // con.query(sql, function (err, result) {
    //   if(err){
    //   console.log(err)
    //   } else{
    //     console.log("Table created");
    //   }
    // });
  });



app.get('/', function (req, res) {
   
  res.sendFile(path.join(__dirname,"welcome_page.html"))

})

app.get('/users/me', function(req, res){
    const userDetail = {
        "name" : "Saugat Poudel",
        "address": "Jorpati, Kathmandu",
        "mobile": "9860401034",
        "profession": "Software Engineer",
        "hobbies": "Tech, Paintings, Social Media",
        "email": "sauugat@gmail.com",
        "password": "******"


    }
    res.send(userDetail);
})

app.get('/user/register', function(req, res){

  res.sendFile(path.join(__dirname,"user_registration.html"))



})

app.get('/users', function(req, res){

  var getUserList = `SELECT * FROM users;`;

  console.log("this is get users query" + getUserList);

  con.query(getUserList, function(err, result){
    if(err){
      console.log('this is error'+err);  
    }
    console.log('this is result'+result);
    res.send(result);
  })

})


app.get('/register_users', function(req, res){
  response = {
    full_name:req.query.name,
    address:req.query.address,
    mobile: req.query.mobile,
    profession: req.query.profession,
    hobbies: req.query.hobbies,
    email: req.query.email,
    password: req.query.password
 };


 var insertUser = `INSERT INTO users (name, address, mobile, profession, hobbies, email, password) 
 VALUES ("${req.query.name}", "${req.query.address}", "${req.query.mobile}","${req.query.profession}"," ${req.query.hobbies}" ," ${req.query.email}"," ${req.query.password}");`;


 console.log('this is inserted data'+ insertUser);
 console.log(response);
 con.query(insertUser, function (err, result) {
  if(err){
    console.log('this is error'+err);  
  }
 
  console.log(result);
});
 res.send(`Dear ${req.query.name} your account has been created sucessfully!. click to login`)


})


app.use(express.static(path.join(__dirname, "/public")));

var server = app.listen(4000, function () {
   console.log("Express App running at http://127.0.0.1:4000/");

})