// modules/projects.js
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// Initialize: combine projects with their sector names
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map(p => {
        const sector = sectorData.find(s => s.id === p.sector_id);
        return { ...p, sector: sector ? sector.sector_name : "Unknown" };
      });
      resolve();
    } catch (err) { 
      reject("Failed to initialize projects: " + err);
    }
  });
}

// Get all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    try {
      resolve(projects);
    } catch (err) {
      reject("Unable to get projects: " + err);
    }
  });
}

// Get project by ID
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const idNum = Number(projectId);
    const found = projects.find(p => p.id === idNum);
    if (found) resolve(found);
    else reject(`Unable to find requested project (id: ${projectId})`);
  });
}

// Get projects by sector (case-insensitive, partial)
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const key = String(sector || "").toLowerCase();
    const list = projects.filter(p => (p.sector || "").toLowerCase().includes(key));
    if (list.length > 0) resolve(list);
    else reject(`Unable to find requested projects for sector like: "${sector}"`);
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
