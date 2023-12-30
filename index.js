import express from "express";
import "dotenv/config";
import mysql from "mysql2";
const app = express();
const port = process.env.portnumber;

//creating connection pool
const connection = mysql.createConnection({
  host: process.env.dbHostName,
  user: process.env.dbUsername,
  password: process.env.dbPassword,
  database: process.env.dbDatabaseName,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  //   res.send("request recieved");
});

app.listen(port, () => {
  console.log("Started Application on " + port);
});
