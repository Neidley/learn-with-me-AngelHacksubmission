const configEnv = require('./config.js');
const configLocal = require('../config.js');


const knex = require('knex')({
  client: 'mysql',
  connection: configEnv.user ? configEnv : configLocal,
});

module.exports = {
    // getUser,
    // getAllCourses,
    // getCourseByUser,
  };