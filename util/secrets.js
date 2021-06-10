require("dotenv-defaults").config();
const logger = require("./logger");

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  MONGODB_URL,
  NODE_ENV,
  SESSION_SECRET,
} = process.env;

const requiredCredentials = [
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "GITHUB_CALLBACK_URL",
  "MONGODB_URL",
];

for (const credential of requiredCredentials) {
  if (!process.env[credential]) {
    logger.error(`Missing required credentials ${credential}`);
    process.exit(1);
  }
}

module.exports = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  MONGODB_URL,
  NODE_ENV,
  SESSION_SECRET,
};
