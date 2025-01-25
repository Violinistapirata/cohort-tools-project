// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// .ENV VARIABLES
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// CONNECTION TO THE DDBB
mongoose
.connect(MONGODB_URI)
.then((res) => console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`))
.catch((err) => console.error("Error connecting to mongo", err))

console.log(process.env.MONGODB_URI);

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("api/cohorts",(req, res)=>{
  Cohort.find();
  res.send();
});

app.get("api/cohorts/:cohortId",(req, res)=>{
  res.send()
});


app.get("api/students",(req, res)=>{
  Student.find();
  res.send();
});


app.get("api/students/cohort/:cohortId",(req, res)=>{
  res.send();
});


app.get("api/students/:studentId",(req, res)=>{
  res.send();
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});