const path = require("path");

// Loads the monorepo root .env. On Vercel there is no file: variables come from the project settings.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
