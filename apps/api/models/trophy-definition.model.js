const { Schema, model } = require("mongoose");

const trophyDefinitionSchema = new Schema(
  {
    exerciseTypeName: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    trophyType: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    weightMultiplier: {
      type: Number,
    },
    repsGoal: {
      type: Number,
    },
    description: {
      type: String,
    },
    rewardText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

trophyDefinitionSchema.index(
  { exerciseTypeName: 1, level: 1 },
  { unique: true }
);

const TrophyDefinition = model("TrophyDefinition", trophyDefinitionSchema);

module.exports = TrophyDefinition;
