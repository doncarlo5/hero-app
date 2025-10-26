const mongoose = require("mongoose");
const TrophyDefinition = require("../models/trophy-definition.model");
const ExerciseType = require("../models/exercise-type.model");
const TrophiesConstant = require("../constants/TrophiesConstant");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/hero-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const migrateTrophyDefinitions = async () => {
  try {
    console.log("Starting trophy definitions migration...");

    // Get all exercise types to create a mapping
    const exerciseTypes = await ExerciseType.find({});
    const exerciseTypeMap = exerciseTypes.reduce((map, exerciseType) => {
      map[exerciseType.name] = exerciseType._id;
      return map;
    }, {});

    console.log(`Found ${exerciseTypes.length} exercise types`);

    // Process each exercise type in TrophiesConstant
    for (const exerciseTypeName in TrophiesConstant) {
      const exerciseTypeId = exerciseTypeMap[exerciseTypeName];

      if (!exerciseTypeId) {
        console.log(
          `Warning: Exercise type "${exerciseTypeName}" not found in database, skipping...`
        );
        continue;
      }

      const trophyDefinitions = TrophiesConstant[exerciseTypeName];
      console.log(
        `Processing ${trophyDefinitions.length} trophy definitions for "${exerciseTypeName}"`
      );

      for (const trophyData of trophyDefinitions) {
        // Check if this trophy definition already exists
        const existingDefinition = await TrophyDefinition.findOne({
          exerciseType: exerciseTypeId,
          level: trophyData.level,
        });

        if (existingDefinition) {
          console.log(
            `Trophy definition for "${exerciseTypeName}" level ${trophyData.level} already exists, skipping...`
          );
          continue;
        }

        // Create new trophy definition
        await TrophyDefinition.create({
          name: trophyData.name,
          exerciseType: exerciseTypeId,
          trophyType: trophyData.trophyType,
          weightMultiplier: trophyData.weightMultiplier,
          repsGoal: trophyData.repsGoal,
          level: trophyData.level,
          description: trophyData.description,
          rewardText: trophyData.rewardText,
        });

        console.log(
          `Created trophy definition: ${trophyData.name} (Level ${trophyData.level})`
        );
      }
    }

    console.log("Trophy definitions migration completed successfully!");

    // Show summary
    const totalDefinitions = await TrophyDefinition.countDocuments();
    console.log(`Total trophy definitions in database: ${totalDefinitions}`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migration if this script is executed directly
if (require.main === module) {
  migrateTrophyDefinitions();
}

module.exports = migrateTrophyDefinitions;
