const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const maincollections = require("../models/maincollections");

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  try {
    const newUser = new maincollections({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(newUser);
    await newUser.save();
    console.log("data saved");
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

module.exports = router;
