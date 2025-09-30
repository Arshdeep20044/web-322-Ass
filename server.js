/********************************************************************************
*  WEB322 – Assignment 01
*  
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name: Arshdeep Singh   Student ID: 178511234   Date: 30-09-2025
*
********************************************************************************/

const express = require("express");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 3000; 

let initialized = false;
app.use(async (req, res, next) => {
  try {
    if (!initialized) {
      await projectData.initialize();
      initialized = true;
      
    }
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("Assignment 1: Arshdeep Singh - 178511234");
});

app.get("/solutions/projects", async (req, res) => {
  try {
    const data = await projectData.getAllProjects();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get("/solutions/projects/id-demo", async (req, res) => {
  try {
    const project = await projectData.getProjectById(9); 
    res.json(project);
  } catch (err) {
    res.status(404).send(String(err));
  }
});

app.get("/solutions/projects/sector-demo", async (req, res) => {
  try {
    const list = await projectData.getProjectsBySector("agriculture"); 
    res.json(list);
  } catch (err) {
    res.status(404).send(String(err));
  }
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});


if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
}
