const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/db");

const mainRouter = require("./routes/mainRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", mainRouter);

app.listen(3000, () => {
  connectDB();
  console.log("listening to port 3000");
});
