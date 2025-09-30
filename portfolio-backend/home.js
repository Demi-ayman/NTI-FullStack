const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // <-- add this

const home = express()
const port = 3000 || process.env.PORT;
home.use(cors());

home.use(express.json());

const projectRoute = require('./projects');
const aboutmeRoute = require('./about');
const contactmeRoute = require('./contact');
const skillsRoute = require('./skills');
const educationRoute = require('./education');

home.use('/skills', skillsRoute);
home.use('/education', educationRoute);
home.use('/projects', projectRoute);
home.use('/about', aboutmeRoute);
home.use('/contact', contactmeRoute);

home.get('/', (req, res) => {
  res.status(200).send('Welcome to My Portfolio');
});

home.listen(port, () => {
  console.log(`server started at port ${port}`);
});