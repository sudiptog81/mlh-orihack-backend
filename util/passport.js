const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require("./secrets");

module.exports = () => {
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
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );
};
