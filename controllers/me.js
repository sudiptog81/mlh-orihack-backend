const User = require("../models/user");
const logger = require("../util/logger");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id })
      .select({
        _id: 0,
        username: 1,
        email: 1,
        avatar: 1,
      })
      .lean();

    res.status(200).send({
      body: user,
    });
  } catch (err) {
    logger.error("GET /me", { err });
    next(err);
  }
};

module.exports = {
  getUser,
};
