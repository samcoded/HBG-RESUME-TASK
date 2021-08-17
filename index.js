const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ejs = require("ejs");
const app = express();
dotenv.config();
const { form } = require("./controller/form");
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/contactform", form);

//Database
const CONNECTION_URL = process.env.MONGOURL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database connected"))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
