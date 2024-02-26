const express=require("express");
const server=express();
const teacherRoute=require("./Routes/teacherRoute");
const childRoute=require("./Routes/childRoute");
const classRouter=require("./Routes/classRouter");
const authenticateRoute=require("./Routes/authanticationRoute");
const authorizationMidWare=require("./Middleware/authorizationMidWare");
const multer=require("./Middleware/MulterMidWare");
const morgan=require("morgan");
const mongoose=require("mongoose");
require('dotenv').config();


//----------settings
//server.use(express.json());

//listen to port number 
const port=process.env.PORT||8080;

mongoose.connect(process.env.url).then(()=>{
console.log("connected to database");

server.listen(port,()=>{console.log("server is listening...")});


}).catch((error)=>{
    console.log("Error connecting to database",error);
});

// server.use(morgan("tiny"));

//----------settings
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(multer.single("image"));
server.use(morgan("tiny"));


//listen to port number 
// const port=process.env.PORT||8080;


//server.listen(port,()=>{console.log("server is listening...")});
// morgan / dev / tiny  >> docs morgan 

server.get('/', (req, res) => {
    res.send("hello from server");

});

//----------routes
server.use(authenticateRoute);
server.use(authorizationMidWare);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRouter);


//not found middleware
server.use((req,res)=>{
    console.log("not found");
    res.status(404).json({message:"not found",})
});
//error handeling midlle
server.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message:error+"",})
});


