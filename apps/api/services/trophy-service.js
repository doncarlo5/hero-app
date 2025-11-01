const Trophy = require("../models/trophy.model");
const ExerciseType = require("../models/exercise-type.model");
const ExerciseUser = require("../models/exercise-user.model");
const Session = require("../models/session.model");
const TrophiesConstants = require("../constants/TrophiesConstant");

/**
 * Initialize all trophies for an exercise type for a user
 * Ensures all trophy levels exist in the database
 */
const initializeTrophiesForExerciseType = async (userId, exerciseTypeId) => {
  const exerciseType = await ExerciseType.findById(exerciseTypeId);
  if (!exerciseType) {
    throw new Error("Exercise type not found");
  }

  const trophyCriteria = TrophiesConstants[exerciseType.name];
  if (!trophyCriteria) {
    // No trophies defined for this exercise type
    return [];
  }

  const initializedTrophies = [];

  for (const trophy of trophyCriteria) {
    // Check if trophy already exists
    const existingTrophy = await Trophy.findOne({
      owner: userId,
      exerciseType: exerciseTypeId,
      level: trophy.level,
    });

    if (!existingTrophy) {
      // Create the trophy if it doesn't exist
      const newTrophy = await Trophy.create({
        name: trophy.name,
        exerciseType: exerciseTypeId,
        exerciseUser: null,
        trophyType: trophy.trophyType,
        repsGoal: trophy.repsGoal,
        weightMultiplier: trophy.weightMultiplier,
        description: trophy.description,
        level: trophy.level,
        awardedAt: null,
        achieved: false,
        rewardText: trophy.rewardText,
        owner: userId,
        repsUser: 0,
        weightUser: 0,
        bestReps: 0,
        bestWeight: 0,
        bodyWeight: null,
      });
      initializedTrophies.push(newTrophy);
    }
  }

  return initializedTrophies;
};

/**
 * Find the best qualifying set for a trophy across all exercise-users
 * Returns null if no set qualifies
 */
const findBestQualifyingSet = (
  allExerciseUsers,
  trophyCriteria,
  bodyWeightsMap
) => {
  let bestSet = null;
  let bestScore = 0;

  for (const exerciseUser of allExerciseUsers) {
    if (!exerciseUser.session) continue;
    const sessionBodyWeight = bodyWeightsMap[exerciseUser.session.toString()];
    if (!sessionBodyWeight) continue;

    const requiredWeight = sessionBodyWeight * trophyCriteria.weightMultiplier;

    // Check all sets in this exercise-user
    for (let i = 0; i < exerciseUser.weight.length; i++) {
      const weight = exerciseUser.weight[i];
      const reps = exerciseUser.rep[i];

      // Check if this set qualifies
      if (weight >= requiredWeight && reps >= trophyCriteria.repsGoal) {
        // Calculate score: prioritize higher weight, then higher reps
        // Using weight * 1000 + reps to give weight more importance
        const score = weight * 1000 + reps;

        if (score > bestScore) {
          bestScore = score;
          bestSet = {
            exerciseUser: exerciseUser._id,
            weight,
            reps,
            bodyWeight: sessionBodyWeight,
            setIndex: i,
          };
        }
      }
    }
  }

  return bestSet;
};

/**
 * Evaluate and update all trophies for an exercise type
 * Checks ALL exercise-users of that type to find the best achievements
 */
const evaluateTrophyForExerciseType = async (userId, exerciseTypeId) => {
  const exerciseType = await ExerciseType.findById(exerciseTypeId);
  if (!exerciseType) {
    throw new Error("Exercise type not found");
  }

  const trophyCriteria = TrophiesConstants[exerciseType.name];
  if (!trophyCriteria) {
    // No trophies defined for this exercise type
    return [];
  }

  // Ensure all trophies are initialized
  await initializeTrophiesForExerciseType(userId, exerciseTypeId);

  // Get ALL exercise-users for this user and exercise type
  const allExerciseUsers = await ExerciseUser.find({
    owner: userId,
    type: exerciseTypeId,
    session: { $exists: true, $ne: null }, // Only get exercise-users with valid sessions
  });

  // Get all unique session IDs to fetch body weights
  const sessionIds = [
    ...new Set(
      allExerciseUsers.map((eu) => eu.session?.toString()).filter(Boolean)
    ),
  ];

  if (sessionIds.length === 0) {
    // No exercise-users with sessions, all trophies should remain locked
    return [];
  }

  const sessions = await Session.find({ _id: { $in: sessionIds } });

  // Create a map of session ID to body weight for quick lookup
  const bodyWeightsMap = {};
  sessions.forEach((session) => {
    bodyWeightsMap[session._id.toString()] = session.body_weight;
  });

  // Get all existing trophies for this exercise type
  const existingTrophies = await Trophy.find({
    owner: userId,
    exerciseType: exerciseTypeId,
  });

  const newlyAwardedTrophies = [];

  // Evaluate each trophy level
  for (const trophyCriteriaItem of trophyCriteria) {
    const existingTrophy = existingTrophies.find(
      (t) => t.level === trophyCriteriaItem.level
    );

    if (!existingTrophy) {
      // This shouldn't happen if initialization worked, but handle it
      console.warn(
        `Trophy not found for level ${trophyCriteriaItem.level}, initializing...`
      );
      await initializeTrophiesForExerciseType(userId, exerciseTypeId);
      continue;
    }

    // Find the best qualifying set across ALL exercise-users
    const bestSet = findBestQualifyingSet(
      allExerciseUsers,
      trophyCriteriaItem,
      bodyWeightsMap
    );

    const trophyShouldBeAchieved = bestSet !== null;

    // Determine if trophy status changed
    const wasAchieved = existingTrophy.achieved;
    const statusChanged = wasAchieved !== trophyShouldBeAchieved;

    // Determine if achievement details changed (even if status is the same)
    const detailsChanged =
      trophyShouldBeAchieved &&
      bestSet &&
      (existingTrophy.exerciseUser?.toString() !==
        bestSet.exerciseUser.toString() ||
        existingTrophy.repsUser !== bestSet.reps ||
        existingTrophy.weightUser !== bestSet.weight ||
        existingTrophy.bestReps !== bestSet.reps ||
        existingTrophy.bestWeight !== bestSet.weight);

    // Update trophy if status or details changed
    if (statusChanged || detailsChanged) {
      if (trophyShouldBeAchieved) {
        // Award or update trophy
        existingTrophy.achieved = true;
        existingTrophy.repsUser = bestSet.reps;
        existingTrophy.weightUser = bestSet.weight;
        existingTrophy.bestReps = bestSet.reps;
        existingTrophy.bestWeight = bestSet.weight;
        existingTrophy.exerciseUser = bestSet.exerciseUser;
        existingTrophy.bodyWeight = bestSet.bodyWeight;

        // Only set awardedAt if this is a new award (wasn't achieved before)
        if (!wasAchieved) {
          existingTrophy.awardedAt = new Date();
          newlyAwardedTrophies.push(existingTrophy);
        }
      } else {
        // Remove trophy achievement
        existingTrophy.achieved = false;
        existingTrophy.awardedAt = null;
        existingTrophy.repsUser = 0;
        existingTrophy.weightUser = 0;
        existingTrophy.bestReps = 0;
        existingTrophy.bestWeight = 0;
        existingTrophy.exerciseUser = null;
        existingTrophy.bodyWeight = null;
      }

      await existingTrophy.save();
    }
  }

  return newlyAwardedTrophies;
};

/**
 * Re-evaluate all trophies for a specific exercise type
 */
const reEvaluateAllTrophiesForExerciseType = async (userId, exerciseTypeId) => {
  return await evaluateTrophyForExerciseType(userId, exerciseTypeId);
};

/**
 * Re-evaluate all trophies for a user across all exercise types
 */
const reEvaluateTrophyForUser = async (userId) => {
  const exerciseTypes = await ExerciseType.find({ owner: userId });
  const allNewTrophies = [];

  for (const exerciseType of exerciseTypes) {
    const newTrophies = await evaluateTrophyForExerciseType(
      userId,
      exerciseType._id
    );
    allNewTrophies.push(...newTrophies);
  }

  return allNewTrophies;
};

module.exports = {
  initializeTrophiesForExerciseType,
  evaluateTrophyForExerciseType,
  reEvaluateAllTrophiesForExerciseType,
  reEvaluateTrophyForUser,
};
