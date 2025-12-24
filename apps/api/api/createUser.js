const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ExerciseType = require("../models/exercise-type.model");
const isAuthenticated = require("../src/is-authenticated");
const defaultExerciseTypesContant = require("../constants/DefaultExerciseTypesConstant");
const ProgramConstants = require("../constants/ProgramConstants");
const { default: mongoose } = require("mongoose");
const Program = require("../models/program.model");
const trophyService = require("../services/trophy-service");
const salt = 10;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const createUser = async (sessionData) => {
  const supabaseId = sessionData.claims.sub;
  let firstName = "";
  let lastName = "";
  if (sessionData.claims.user_metadata.full_name) {
    [firstName, lastName] =
      sessionData.claims.user_metadata.full_name.split(" ");
  } else {
    firstName = sessionData.claims.user_metadata.firstName;
    lastName = sessionData.claims.user_metadata.lastName;
  }
  const email = sessionData.claims.email;

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

  // Initialize trophies for all exercise types using the trophy service
  // This ensures consistent initialization and handles edge cases
  for (const exerciseType of createdExerciseTypes) {
    try {
      await trophyService.initializeTrophiesForExerciseType(
        newUser._id,
        exerciseType._id
      );
    } catch (error) {
      // Log error but don't fail user creation if trophy initialization fails
      console.error(
        `Error initializing trophies for exercise type ${exerciseType.name}:`,
        error
      );
    }
  }
};

module.exports = createUser;
