const express = require("express");
const router = express.Router();

const Trophy = require("../models/trophy.model");
const isAuthenticated = require("../src/is-authenticated");
const trophyService = require("../services/trophy-service");

// checkAndAwardTrophies used in api/exercise-user.js when create and update
// Now uses the service to evaluate ALL exercise-users of that type
const checkAndAwardTrophies = async (exerciseUser) => {
  if (!exerciseUser.type || !exerciseUser.owner) {
    console.log("Exercise user missing type or owner");
    return [];
  }

  try {
    // Use the service to evaluate all trophies for this exercise type
    // This checks ALL exercise-users, not just the current one
    const newlyAwardedTrophies =
      await trophyService.evaluateTrophyForExerciseType(
        exerciseUser.owner,
        exerciseUser.type
      );

    // Return only the trophies that were just awarded (new achievements)
    return newlyAwardedTrophies.map((t) => t.toJSON());
  } catch (error) {
    console.error("Error checking trophies:", error);
    return [];
  }
};

// Fetch all trophies for the authenticated user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const trophies = await Trophy.find({ owner: userId })
      .populate("exerciseType")
      .populate("exerciseUser");
    res.json(trophies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
module.exports.checkAndAwardTrophies = checkAndAwardTrophies;
