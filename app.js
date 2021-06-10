const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { SESSION_SECRET } = require("./util/secrets");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true,
  store: "",
};

app.use(session(sessionOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

module.exports = app;
