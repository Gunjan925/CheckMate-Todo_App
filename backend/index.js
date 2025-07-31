const express = require("express");
const app = express();

app.listen(5000, ()  => {
    console.log("Server is running on port 5000");
})

/*
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);
*/