const mongoose = require("mongoose");
const TrophyDefinition = require("../models/trophy-definition.model");
const ExerciseType = require("../models/exercise-type.model");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/hero-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const testTrophyDefinitions = async () => {
  try {
    console.log("Testing TrophyDefinition system...");

    // Check if trophy definitions exist
    const trophyDefinitions = await TrophyDefinition.find({}).populate(
      "exerciseType"
    );

    if (trophyDefinitions.length === 0) {
      console.log("❌ No trophy definitions found. Run the migration first:");
      console.log("   node apps/api/seed/migrateTrophyDefinitions.js");
      return;
    }

    console.log(`✅ Found ${trophyDefinitions.length} trophy definitions`);

    // Group by exercise type
    const groupedByExerciseType = trophyDefinitions.reduce((acc, trophy) => {
      const exerciseTypeName = trophy.exerciseType?.name || "Unknown";
      if (!acc[exerciseTypeName]) {
        acc[exerciseTypeName] = [];
      }
      acc[exerciseTypeName].push(trophy);
      return acc;
    }, {});

    // Display summary
    console.log("\n📊 Trophy Definitions Summary:");
    for (const [exerciseTypeName, trophies] of Object.entries(
      groupedByExerciseType
    )) {
      console.log(`  ${exerciseTypeName}: ${trophies.length} trophies`);
      trophies.forEach((trophy) => {
        console.log(
          `    - Level ${trophy.level}: ${trophy.trophyType} (${trophy.weightMultiplier}x body weight, ${trophy.repsGoal} reps)`
        );
      });
    }

    // Test a specific trophy definition
    const sampleTrophy = trophyDefinitions[0];
    console.log(`\n🔍 Sample Trophy Definition:`);
    console.log(`  Name: ${sampleTrophy.name}`);
    console.log(`  Exercise Type: ${sampleTrophy.exerciseType?.name}`);
    console.log(`  Level: ${sampleTrophy.level}`);
    console.log(`  Type: ${sampleTrophy.trophyType}`);
    console.log(`  Weight Multiplier: ${sampleTrophy.weightMultiplier}`);
    console.log(`  Reps Goal: ${sampleTrophy.repsGoal}`);
    console.log(`  Description: ${sampleTrophy.description}`);

    console.log("\n✅ TrophyDefinition system is working correctly!");
  } catch (error) {
    console.error("❌ Error testing trophy definitions:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run test if this script is executed directly
if (require.main === module) {
  testTrophyDefinitions();
}

module.exports = testTrophyDefinitions;
