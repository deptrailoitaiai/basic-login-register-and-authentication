const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = express.Router();
const authenticate = require("../middleware/auth");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

router.get("/", authenticate, (req, res) => {
  res.status(200).render("auth");
});

module.exports = router;
