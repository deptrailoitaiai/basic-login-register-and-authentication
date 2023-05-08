const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const maincollections = require("../models/maincollections");
const validator = require("validator");

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

    const validatorVerify = await validator.isEmail(req.body.email);
    if(!validatorVerify) return res.send(`
    <script>
      alert("invalid email");
    </script>
    `)
     
    await newUser.save();
    console.log("data saved");
    res.redirect("/login");
  } catch (err) {
    if(err.code === 11000){
      return res.send(`
      <script>
        alert("email existed");
        window.location.href = '/register';
      </script>
      `)
    }
  }
});

module.exports = router;
