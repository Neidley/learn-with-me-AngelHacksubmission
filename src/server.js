const express = require('express');
//const bodyParser = require('body-parser');
//const path = require('path');
//const bcrypt = require('bcrypt');
//const db = require('../database/index.js');
//const helpers = require('./helpers.js');//eslint-disable-line
const app = express();
/*app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});*/

app.get('/users', async (req, res) => {
  const Users = await db.getUsers(req.query.users);
  res.status(200).send(Users);
});

app.get('/courses', async (req, res) => {
  const Courses = await db.getCourses(req.query.courses);
  res.status(200).send(Courses);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});
