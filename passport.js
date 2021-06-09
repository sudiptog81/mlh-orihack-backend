const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

require("dotenv").config();

/**
 * Serialize user from passport.
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

/**
 * Deserialise User from passport.
 */
passport.deserializeUser((user, done) => {
  done(null, user);
});

/**
 * Possport middelware with Github strategy.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);
