const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { clientID, clientSecret, callbackURL } = require("./utils/secrets");

/**
 * Possport middelware with Github strategy.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

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
