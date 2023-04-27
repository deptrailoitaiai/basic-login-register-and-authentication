const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const connectDB = require("../backend_profect/controllers/server");
const app = express();
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");

app.use(morgan("combined"));

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/auth", indexRouter);

app.listen(3000, () => {
  console.log("listening at http://localhost:3000/login");
});
