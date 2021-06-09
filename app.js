const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(
  cookieSession({
    name: "github-auth-session-app-name",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
