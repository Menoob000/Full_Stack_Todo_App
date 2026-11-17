CREATE DATABASE todoApp;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY, 
    task VARCHAR(255),
    description VARCHAR(255), 
    status VARCHAR(255)
); 

