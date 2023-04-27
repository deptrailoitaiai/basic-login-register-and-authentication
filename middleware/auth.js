const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.use(cookieParser());

router.get("/", async function (req, res, next) {
  const token = req.cookies["client-info"].accessToken;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    }
  });
  next();
});

module.exports = router;
