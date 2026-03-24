CREATE DATABASE IF NOT EXISTS taskdb;
USE taskdb;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title) VALUES ('Learning Docker');
INSERT INTO tasks (title) VALUES ('Building a Full-Stack App');
INSERT INTO tasks (title) VALUES ('MySQL Connection Setup');
