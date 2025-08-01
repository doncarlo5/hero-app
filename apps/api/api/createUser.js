const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ExerciseType = require("../models/exercise-type.model");
const isAuthenticated = require("../src/is-authenticated");
const Trophy = require("../models/trophy.model");
const TrophiesConstant = require("../constants/TrophiesConstant");
const defaultExerciseTypesContant = require("../constants/DefaultExerciseTypesConstant");
const ProgramConstants = require("../constants/ProgramConstants");
const { default: mongoose } = require("mongoose");
const Program = require("../models/program.model");
const salt = 10;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const createUser = async (sessionData) => {
  const supabaseId = sessionData.user.id;
  let firstName = "";
  let lastName = "";
  if (sessionData.user.user_metadata.full_name) {
    [firstName, lastName] = sessionData.user.user_metadata.full_name.split(" ");
  } else {
    firstName = sessionData.user.user_metadata.firstName;
    lastName = sessionData.user.user_metadata.lastName;
  }
  const email = sessionData.user.email;

  // Create the user
  const newUser = await User.create({
    supabaseId,
    firstName: firstName,
    lastName: lastName,
    email,
  });

  // Add exercise type defaults to the new user
  const createdExerciseTypes = await ExerciseType.insertMany(
    defaultExerciseTypesContant.map((exerciseType) => ({
      ...exerciseType,
      owner: newUser._id,
    }))
  );

  // Create a mapping from exercise type names to their _ids
  const exerciseTypeMap = createdExerciseTypes.reduce((map, exerciseType) => {
    map[exerciseType.name] = exerciseType._id;
    return map;
  }, {});

  // Seed programs for the new user based on ProgramConstants
  for (const sessionType in ProgramConstants) {
    const exercises = ProgramConstants[sessionType]
      .map((exercise, index) => {
        const exerciseTypeId = exerciseTypeMap[exercise.name];
        if (!exerciseTypeId) {
          return null; // Skip this exercise if no matching type is found
        }
        return {
          exerciseType: exerciseTypeId,
          order: index + 1,
          alternatives: exercise.alternatives
            .map((alt) => exerciseTypeMap[alt])
            .filter((id) => id !== undefined), // Remove any undefined alternatives
        };
      })
      .filter((exercise) => exercise !== null); // Remove null exercises

    if (exercises.length > 0) {
      // Create program for the user only if there are valid exercises
      try {
        await Program.create({
          sessionType,
          exercises,
          owner: newUser._id,
        });
      } catch (error) {
        // If an error occurs, we'll just skip this program
        continue;
      }
    }
  }

  // Function to seed trophies for a new user
  for (const exerciseType of createdExerciseTypes) {
    const trophies = TrophiesConstant[exerciseType.name];
    if (trophies) {
      for (const trophy of trophies) {
        await Trophy.create({
          name: trophy.name,
          exerciseType: exerciseType._id,
          exerciseUser: null,
          trophyType: trophy.trophyType,
          repsGoal: trophy.repsGoal,
          weightMultiplier: trophy.weightMultiplier,
          description: trophy.description,
          level: trophy.level,
          awardedAt: null,
          achieved: false,
          rewardText: trophy.rewardText,
          owner: newUser._id,
        });
      }
    }
  }
};

module.exports = createUser;
