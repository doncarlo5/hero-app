const express = require("express");
const router = express.Router();

const Trophy = require("../models/trophy.model");
const ExerciseType = require("../models/exercise-type.model");
const Session = require("../models/session.model");
const TrophyDefinition = require("../models/trophy-definition.model");
const isAuthenticated = require("../src/is-authenticated");
const { initializeTrophyProgressForUser } = require("../src/trophy-progress");

// checkAndAwardTrophies used in api/exercise-user.js when create and update
const checkAndAwardTrophies = async (exerciseUser) => {
  const { type, weight, rep, session, owner } = exerciseUser;
  const sessionDetails = await Session.findById(session);

  if (!sessionDetails) {
    console.log("Session not found for trophy evaluation");
    return;
  }
  const sessionBodyWeight = sessionDetails?.body_weight;
  const bodyWeightUser =
    typeof sessionBodyWeight === "number" ? sessionBodyWeight : null;
  const comparisonBodyWeight = bodyWeightUser ?? 0;

  // Fetch the exercise type details
  const exerciseType = await ExerciseType.findById(type);

  if (!exerciseType) {
    console.log("Exercise type not found");
    return;
  }

  const trophyDefinitions = await TrophyDefinition.find({
    exerciseTypeName: exerciseType.name,
  }).sort({ level: 1 });

  if (!trophyDefinitions.length) {
    console.log("Trophy definitions not found");
    return;
  }

  let existingTrophies = await Trophy.find({ owner, exerciseType: type }).populate(
    "definition"
  );

  if (existingTrophies.length < trophyDefinitions.length) {
    await initializeTrophyProgressForUser(owner, [exerciseType]);
    existingTrophies = await Trophy.find({ owner, exerciseType: type }).populate(
      "definition"
    );
  }

  const trophiesByDefinition = new Map();
  existingTrophies.forEach((trophyDoc) => {
    if (trophyDoc.definition) {
      trophiesByDefinition.set(
        trophyDoc.definition._id.toString(),
        trophyDoc
      );
    }
    trophiesByDefinition.set(`level-${trophyDoc.level}`, trophyDoc);
  });

  const newTrophies = [];

  for (const definition of trophyDefinitions) {
    const definitionId = definition._id.toString();
    const existingTrophy =
      trophiesByDefinition.get(definitionId) ||
      trophiesByDefinition.get(`level-${definition.level}`);

    if (!existingTrophy) {
      continue;
    }

    let metadataUpdated = false;

    if (
      !existingTrophy.definition ||
      existingTrophy.definition.toString() !== definitionId
    ) {
      existingTrophy.definition = definition._id;
      metadataUpdated = true;
    }

    const syncFields = [
      ["name", definition.name],
      ["trophyType", definition.trophyType],
      ["repsGoal", definition.repsGoal],
      ["weightMultiplier", definition.weightMultiplier],
      ["description", definition.description],
      ["level", definition.level],
      ["rewardText", definition.rewardText],
    ];

    syncFields.forEach(([field, value]) => {
      if (value !== undefined && existingTrophy[field] !== value) {
        existingTrophy[field] = value;
        metadataUpdated = true;
      }
    });

    let trophyAchieved = false;
    let repsUser = existingTrophy.repsUser || 0;
    let weightUser = existingTrophy.weightUser || 0;

    for (let i = 0; i < weight.length; i++) {
      const repsGoal = definition.repsGoal || 0;
      const weightMultiplier = definition.weightMultiplier || 0;

      if (
        rep[i] >= repsGoal &&
        weight[i] >= comparisonBodyWeight * weightMultiplier
      ) {
        trophyAchieved = true;
        repsUser = rep[i];
        weightUser = weight[i];
        break;
      }
    }

    if (!existingTrophy.achieved && trophyAchieved) {
      existingTrophy.achieved = true;
      existingTrophy.awardedAt = new Date();
      existingTrophy.repsUser = repsUser;
      existingTrophy.weightUser = weightUser;
      existingTrophy.exerciseUser = exerciseUser._id;
      existingTrophy.bodyWeight = bodyWeightUser;
      const updatedTrophy = await existingTrophy.save();
      await updatedTrophy.populate(["definition", "exerciseType", "exerciseUser"]);
      newTrophies.push(updatedTrophy.toJSON());
      metadataUpdated = false;
    } else if (existingTrophy.achieved && !trophyAchieved) {
      existingTrophy.achieved = false;
      existingTrophy.awardedAt = null;
      existingTrophy.repsUser = 0;
      existingTrophy.weightUser = 0;
      existingTrophy.exerciseUser = null;
      existingTrophy.bodyWeight = null;
      await existingTrophy.save();
      metadataUpdated = false;
    }

    if (metadataUpdated) {
      await existingTrophy.save();
    }
  }

  return newTrophies;
};

// Add a route to fetch all trophies for a user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const trophies = await Trophy.find({ owner: userId })
      .populate("exerciseType")
      .populate("exerciseUser")
      .populate("definition");
    res.json(trophies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
module.exports.checkAndAwardTrophies = checkAndAwardTrophies;
