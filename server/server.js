const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const BlogRoutes = require("./routes/blog");

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/blogs", BlogRoutes);

mongoose
  .connect(
    "mongodb+srv://Jebolwski:85GiGJTTUU2vNJIR@blogcluster.ynsrg1x.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(app.listen(8000))
  .then(console.log("server is running on port 8000"))
  .catch((error) => {
    console.log(error);
  });
