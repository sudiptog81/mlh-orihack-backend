const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { secret } = require("./utils/secrets");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const { default: initPassport } = require("./helper/initPassport");

const app = express();

const sessionOptions = {
  secret,
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true,
  store: "",
};
app.use(session(sessionOptions));
initPassport(app);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
