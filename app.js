const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");

const initPassport = require("./util/passport");
const logger = require("./util/logger");
const { MONGODB_URL, SESSION_SECRET } = require("./util/secrets");

const routes = require("./routes");

const app = express();

initPassport();

mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      logger.error("Error connecting to MongoDB", {
        err,
      });
      process.exit(1);
    }
  }
);

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  expires: new Date() * 60 * 60 * 24 * 7,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGODB_URL,
  }),
};

app.use(session(sessionOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(cors());
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// 404 error handler
app.use((error, req, res) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  // render 404 page
  res.status(error.status || 500);
  res.send({
    error: error.message,
  });
});

module.exports = app;
