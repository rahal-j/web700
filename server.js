/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Nalinda___ Student ID: _150367233___ Date: __06/23/2024______
*
********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const collegeData = require("./modules/collegeData");
const path = require('path');
var app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Route to get all students or students by course
app.get("/students", (req, res) => {
  const course = req.query.course;
  
  if (course) {
    // If course query parameter is provided, get students by course
    collegeData.getStudentsByCourse(course)
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  } else {
    // If no query parameter, get all students
    collegeData.getAllStudents()
      .then((students) => {
        res.json(students);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then((tas) => {
            res.json(tas);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((courses) => {
            res.json(courses);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

app.get("/student/:num", (req, res) => {
    const num = req.params.num;

    collegeData.getStudentByNum(num)
        .then((student) => {
            res.json(student);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize data and start the server
collegeData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("unable to start server: " + err);
  });
