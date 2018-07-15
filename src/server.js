const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./database/index.js');
//const helpers = require('./helpers.js');//eslint-disable-line
const app = express();
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/user', async (req, res) => {
  const User = await db.getUserbyUsername(req.query.username);
  res.status(200).send(User);
});

app.get('/courses', async (req, res) => {
  const Courses = await db.getCourses();
  res.status(200).send(Courses);
});

//signUp!!
app.post('/register/user', async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.addUser(req.body.username, hash, req.body.email, req.body.userType, req.body.skills);
  if (registration === 'username already exists') {
    return res.send('username already exists');
  } if (registration === 'email already exists') {
    return res.send('email already exists');
  }
  const user = await db.getUser(req.body.username);
  req.login(user[0], () => {
    res.send(user);
  });
});

app.post('/login', async (req, res) => {
  const userInfo = await db.checkCredentials(req.body.username);
  if (userInfo.length) {
    const checkUser = userInfo[0];
    if (bcrypt.compareSync(req.body.password, checkUser.password)) {
      const user = await db.getUser(req.body.username);
      req.login(user[0], () => {
        res.send(user);
      });
    } else {
      res.send('your password is incorrect');
    }
  } else {
    res.send('Username does not exist');
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});
