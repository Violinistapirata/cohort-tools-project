// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const CORS = require("cors");

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
app.use(CORS());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
//COHORT ROUTES

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts",(req, res)=>{
  Cohort.find().then((cohorts) => {
    res.json(cohorts);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
  
});

app.get("/api/cohorts/:cohortId",(req, res)=>{
  Cohort.findById(req.params.cohortId)
  .then((cohort)=>{
    res.json(cohort)
    
  })
  .catch((error) => {
    res.status(400).json(error);
  }); 
});

//  COHORT POST ROUTES

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// COHORT PUT ROUTES

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// COHORT DELETE ROUTES

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});



// STUDENTS ROUTES

app.get("/api/students", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


app.get("/api/students/cohort/:cohortId",(req, res)=>{
  Student.find({cohort: req.params.cohortId})
  .populate("cohort")
  .then((students) => {
    res.json(students);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
});


app.get("/api/students/:studentId",(req, res)=>{
  Student.findById(req.params.studentId)
  .populate("cohort")
  .then((students) => {
    res.json(students);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
});

// STUDENT POST ROUTES


app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// STUDENT PUT ROUTES

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// STUDENT DELETE ROUTES

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});