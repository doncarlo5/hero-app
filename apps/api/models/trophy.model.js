const { Schema, model } = require("mongoose");

const trophySchema = new Schema(
  {
    name: { type: String, required: true },
    exerciseType: {
      type: Schema.Types.ObjectId,
      ref: "ExerciseType",
    },
    exerciseUser: {
      type: Schema.Types.ObjectId,
      ref: "ExerciseUser",
    },
    trophyType: { type: String, required: true },
    repsGoal: { type: Number },
    weightMultiplier: { type: Number },
    achieved: { type: Boolean, default: false },
    description: { type: String, required: true },
    level: { type: Number },
    repsUser: { type: Number },
    weightUser: { type: Number },
    bestReps: { type: Number, default: 0 },
    bestWeight: { type: Number, default: 0 },
    awardedAt: { type: Date },
    rewardText: { type: String },
    bodyWeight: { type: Number },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for faster lookups
trophySchema.index({ owner: 1, exerciseType: 1, level: 1 });
trophySchema.index({ owner: 1, exerciseType: 1 });

const Trophy = model("Trophy", trophySchema);

module.exports = Trophy;
