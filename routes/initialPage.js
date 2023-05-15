const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = express.Router();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

router.get("/", (req, res) => {
  res.status(200).render("initialPage");
});

module.exports = router;
