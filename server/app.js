

/* ----------------------- SERVER SET UP ----------------------- */


// IMPORTS
const express = require("express"); //<-- To create the server
const logger = require("morgan"); //<-- To console.log requests in the server terminal
const CORS = require("cors"); //<-- To allow the front end to make requests to the server
const cookieParser = require("cookie-parser"); //<-- ???
const mongoose = require("mongoose"); //<-- To connect to MongoDB

// STATIC DATA (SCHEMA MODELS)
// Devs Team - Import the provided files with JSON data of students and cohorts here: <-- THIS CAN BE DELETED
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// .ENV VARIABLES
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT; //<--PORT=5005

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express  <-- THIS URL CAN BE DELETED
const app = express();

// CONNECTION TO THE DDBB
mongoose
.connect(MONGODB_URI)
.then((res) => console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`))
.catch((err) => console.error("Error connecting to mongo", err))

// console.log(process.env.MONGODB_URI); <-- THIS CONSOLE LOG SHOULD BE DELETED



/* ----------------------- MIDDLEWARE ----------------------- */


// Research Team - Set up CORS middleware here:
/* app.use(CORS({origin: ['http://localhost:5173/']})); //<-- client PORT (npm run dev in client side) */
app.use(CORS());
app.use(express.json()); //<-- Parses request query strings to json format
app.use(logger("dev"));
app.use(express.static("public")); //<-- configures access to the static files in this directory
app.use(express.urlencoded({ extended: false })); //<-- ???
app.use(cookieParser()); //<-- ???



/* ----------------------- COHORTS ROUTES ----------------------- */


// ROUTES - https://expressjs.com/en/starter/basic-routing.html <-- THIS CAN BE DELETED
// Devs Team - Start working on the routes here:                <-- THIS CAN BE DELETED

// GET

// Show the API documentation page
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Show the info of all the cohorts 
app.get("/api/cohorts",(req, res)=>{
  Cohort.find(req.query).then((cohorts) => {
    res.json(cohorts);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
  
});

// Show only the info of the specified cohort 
app.get("/api/cohorts/:cohortId",(req, res)=>{
  Cohort.findById(req.params.cohortId)
  .then((cohort)=>{
    res.json(cohort)
    
  })
  .catch((error) => {
    res.status(400).json(error);
  }); 
});

// POST

// Create a new cohort with the info provided in the request body
app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((cohort) => {
      res.status(201).json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// PUT

// Update the specified existing cohort with the info provided in the request body
app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// DELETE

// Delete the specified existing cohort
app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});



/* ----------------------- STUDENTS ROUTES ----------------------- */


// GET

// Show the info of all the students 
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

// Show only the info of the students that belong in the specified cohort
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

// Show only the info of the specified student
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


// POST

// Create a new student with the info provided in the request body
app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


// PUT

// Update the specified existing student with the info provided in the request body
app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});


// DELETE

// Delete the specified existing student
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((student) => {
      res.json(student);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});



/* ----------------------- START THE SERVER ----------------------- */


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});