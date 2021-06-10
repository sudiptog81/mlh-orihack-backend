const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");

const initPassport = require("./util/passport");
const logger = require("./util/logger");
const { MONGODB_URL, SESSION_SECRET } = require("./util/secrets");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();

initPassport();

mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

module.exports = app;
