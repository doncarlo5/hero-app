const express = require("express");

const router = express.Router();

const auth = require("./auth");
const sessions = require("./sessions");
const exerciseUser = require("./exercise-user");
const exerciseType = require("./exercise-type");
const trophy = require("./trophy");
const emojis = require("./emojis");
const feedback = require("./feedback");
const program = require("./program");

const isAuthenticated = require("../src/is-authenticated");

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);

router.use("/auth", auth);

router.use("/sessions", isAuthenticated, sessions);

router.use("/exercise-user", isAuthenticated, exerciseUser);

router.use("/exercise-type", isAuthenticated, exerciseType);

router.use("/trophies", isAuthenticated, trophy);

router.use("/feedbacks", feedback);

router.use("/program", isAuthenticated, program);

module.exports = router;
