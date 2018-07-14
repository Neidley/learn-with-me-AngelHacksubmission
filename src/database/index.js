const configEnv = require('./config.js');
const configLocal = require('./config.js');


const knex = require('knex')({
  client: 'mysql',
  connection: configEnv.user ? configEnv : configLocal,
});

const checkCredentials = username => knex.select().from('users')
  .where(knex.raw(`LOWER(username) = LOWER('${username}')`));

const addUser = async (username, password, email, userType, skills) => {
  const userQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
  const emailQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(email) = LOWER('${email}')`));
  if (userQuery.length) {
    return 'username already exists';
  } else if (emailQuery.length) {
    return 'email already exists';
  }
  return knex('users').insert({
    username, password, email, user_type: userType, skills: skills
  });
};

const getUserByUsername = async (username) => {
  const user = await knex.select('*').from('users').where('username', username);
  return user[0];
};

const getCourses = async () => {
  const courses = await knex.select('*').from('courses');
  return courses;
};

// const getCourseProgress = async (userId) => {

// };

//getCourseProgress??

module.exports = {
    checkCredentials,
    addUser,
    getUserByUsername,
    getCourses,
    // getCourseProgress,
  };