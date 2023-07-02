require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("../mongoDB-FreeCodeCamp/routes/routes");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Servidor Express iniciado en Puerto ${3000}`);
});
