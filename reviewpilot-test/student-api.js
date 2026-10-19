// ReviewPilot test file: contains intentionally planted bugs for the AI reviewer.
const express = require("express");
const db = require("./db");

const app = express();

// Bug 1: SQL injection - user input concatenated into the query
app.get("/student", async (req, res) => {
  const name = req.query.name;
  const rows = await db.query("SELECT * FROM students WHERE name = '" + name + "'");
  res.json(rows);
});

// Bug 2: hard-coded secret
const ADMIN_TOKEN = "sk_live_51HxDemoTokenDoNotUse";

// Bug 3: off-by-one error - reads past the end of the array
function averageMarks(marks) {
  let total = 0;
  for (let i = 0; i <= marks.length; i++) {
    total += marks[i];
  }
  return total / marks.length;
}

// Bug 4: missing error handling on a network call
async function fetchStudent(id) {
  const res = await fetch("https://api.example.com/students/" + id);
  return res.json();
}

module.exports = { app, averageMarks, fetchStudent, ADMIN_TOKEN };
