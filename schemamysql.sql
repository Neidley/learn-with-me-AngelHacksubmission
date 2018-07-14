drop database if exists masterDb;

create database masterDb;
use master Db;



DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS courseforuser;
-- DROP TABLE IF EXISTS ratings;

CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email VARCHAR(255) DEFAULT NULL,
  is_mentor boolean DEFAULT FALSE,
  learning_assistance_cat boolean DEFAULT FALSE,
  skills VARCHAR(8000) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

CREATE TABLE courses
(
  course_id INT NOT NULL AUTO_INCREMENT,
  course_name VARCHAR(25) NOT NULL,
  course_url VARCHAR(255) NOT NULL,
  author VARCHAR(25) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
-- ratings????
  PRIMARY KEY (course_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE courseforuser
(
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
  FOREIGN KEY (course_id) REFERENCES courses (course_id)
);

-- CREATE TABLE ratings
-- (
--   user_id INT NOT NULL,
--   course_id INT NOT NULL,
--   PRIMARY KEY (user_id, course_id),
--   FOREIGN KEY (user_id) REFERENCES users (user_id)
--   FOREIGN KEY (course_id) REFERENCES courses (course_id)
-- );



-- INSERT TEST DATA....