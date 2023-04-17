// import { config as dotenvConfig } from "dotenv";
// import Constants from "expo-constants";

// const { config: dotenvConfig } = require("dotenv");
// const Constants = require("expo-constants");

// Load environment variables from .env file
// dotenvConfig();

const extra = {
  apiKey: process.env.API_KEY,
};

// If running in the Expo client app, add the variables to Constants.manifest
// if (Constants.manifest) {
//   Constants.manifest.extra = extra;
// }

module.exports = {
  // ... Your existing Expo config
  extra,
};
