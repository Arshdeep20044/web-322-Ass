/********************************************************************************
*  WEB322 – Assignment 01
*  
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name: Arshdeep Singh   Student ID: 178511234   Date: 25-09-2025
*
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

// Home route
app.get("/", (req, res) => {
  res.send("Assignment1: Arshdeep Singh - 178511234");
});

// Get all projects
app.get("/solutions/projects", (req, res) => {
  projectData.getAllProjects()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err }));
});

// Demo: project by ID
app.get("/solutions/projects/id-demo", (req, res) => {
  projectData.getProjectById(9)
    .then(project => res.json(project))
    .catch(err => res.status(404).send(err));
});

// Demo: projects by sector
app.get("/solutions/projects/sector-demo", (req, res) => {
  projectData.getProjectsBySector("agriculture")
    .then(list => res.json(list))
    .catch(err => res.status(404).send(err));
});

// Start server only after initialization
projectData.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Initialization failed:", err);
  });
