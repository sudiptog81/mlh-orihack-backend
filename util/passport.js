const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const logger = require("./logger");
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require("./secrets");
const User = require("../models/user");

module.exports = () => {
  /**
   * Serialize user from passport.
   */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  /**
   * Deserialise User from passport.
   */
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
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
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOneAndUpdate(
            { username: profile.username },
            {
              accessToken,
              refreshToken,
            }
          );

          if (!user) {
            user = await User.create({
              accessToken,
              refreshToken,
              username: profile.username,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            });
          }

          done(null, user);
        } catch (err) {
          logger.error("Github OAuth2 Error", { err });
          done(err, null);
        }
      }
    )
  );
};
