const mongoose = require("mongoose");
const TrophyDefinition = require("../models/trophy-definition.model");
const TrophiesConstant = require("../constants/TrophiesConstant");

const MONGODB_URI = process.env.MONGODB_URI;

const flattenDefinitions = () => {
  return Object.entries(TrophiesConstant).flatMap(
    ([exerciseTypeName, trophies]) =>
      trophies.map((trophy) => ({
        exerciseTypeName,
        name: trophy.name,
        trophyType: trophy.trophyType,
        level: trophy.level,
        weightMultiplier: trophy.weightMultiplier,
        repsGoal: trophy.repsGoal,
        description: trophy.description,
        rewardText: trophy.rewardText,
      }))
  );
};

const seedDefinitions = async () => {
  try {
    const definitions = flattenDefinitions();

    for (const definition of definitions) {
      await TrophyDefinition.updateOne(
        {
          exerciseTypeName: definition.exerciseTypeName,
          level: definition.level,
        },
        {
          $set: definition,
        },
        { upsert: true }
      );
    }

    console.log("Trophy definitions seeded successfully");
  } catch (error) {
    console.error("Failed to seed trophy definitions", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

(async () => {
  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  await seedDefinitions();
})();
