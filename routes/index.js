const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = express.Router();
const authenticate = require("../middleware/auth");

router.get("/", authenticate, (req, res) => {
  res.render("auth");
});

module.exports = router;
