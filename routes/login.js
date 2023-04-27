const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const maincollections = require("../models/maincollections");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

router.use(cookieParser());

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    const existedField = await maincollections.findOne({
      email: req.body.email,
    });
    if (!existedField) {
      res.redirect("/login");
      return res.alert("Your account does not exist, you can create one below");
    }
    const isValidPassword = await existedField.isValidPassword(
      req.body.password
    );
    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const accessToken = jwt.sign(
      {
        name: existedField.name,
        email: existedField.email,
      },
      process.env.JWT_KEY
    );

    await res.cookie(
      "client-info",
      {
        name: existedField.name,
        email: existedField.email,
        accessToken: accessToken,
      },
      { maxAge: 3600000 }
    );

    console.log("cookie sent");
    res.redirect("/auth");
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
});

module.exports = router;
