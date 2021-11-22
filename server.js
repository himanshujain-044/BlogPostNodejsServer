require("dotenv").config();
const fs = require("fs");
const http = require("http");
// const https = require("https");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// your express configuration here

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
const portHttpServer = process.env.PORTHTTP;
// const portHttpsServer = process.env.PORTHTTPS;
httpServer.listen(portHttpServer, () => {
  mongoose
    .connect(process.env.MONGODB_URL_LOCAL)
    .then(() => {
      console.log(
        `Connected to local - Database for http server to port ${portHttpServer}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("<h1> Hello, Welcome to Blog post, Thank you...</h1>");
});