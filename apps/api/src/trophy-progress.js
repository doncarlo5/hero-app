const Trophy = require("../models/trophy.model");
const TrophyDefinition = require("../models/trophy-definition.model");

const groupDefinitionsByExercise = (definitions) => {
  return definitions.reduce((acc, definition) => {
    if (!acc[definition.exerciseTypeName]) {
      acc[definition.exerciseTypeName] = [];
    }
    acc[definition.exerciseTypeName].push(definition);
    return acc;
  }, {});
};

const initializeTrophyProgressForUser = async (ownerId, exerciseTypes) => {
  if (!exerciseTypes?.length) {
    return;
  }

  const exerciseTypeNames = exerciseTypes.map((exerciseType) => exerciseType.name);

  const trophyDefinitions = await TrophyDefinition.find({
    exerciseTypeName: { $in: exerciseTypeNames },
  });

  if (!trophyDefinitions.length) {
    return;
  }

  const definitionsByExercise = groupDefinitionsByExercise(trophyDefinitions);

  const trophyProgressDocs = [];

  exerciseTypes.forEach((exerciseType) => {
    const definitions = definitionsByExercise[exerciseType.name] || [];

    definitions.forEach((definition) => {
      trophyProgressDocs.push({
        owner: ownerId,
        exerciseType: exerciseType._id,
        definition: definition._id,
        name: definition.name,
        trophyType: definition.trophyType,
        repsGoal: definition.repsGoal,
        weightMultiplier: definition.weightMultiplier,
        description: definition.description,
        level: definition.level,
        rewardText: definition.rewardText,
        exerciseUser: null,
        achieved: false,
        awardedAt: null,
        repsUser: 0,
        weightUser: 0,
      });
    });
  });

  if (!trophyProgressDocs.length) {
    return;
  }

  const existingProgress = await Trophy.find({
    owner: ownerId,
    definition: { $in: trophyProgressDocs.map((doc) => doc.definition) },
  }).select("definition exerciseType");

  const existingKeys = new Set(
    existingProgress.map(
      (progress) => `${progress.definition?.toString()}-${progress.exerciseType?.toString()}`
    )
  );

  const docsToInsert = trophyProgressDocs.filter((doc) => {
    const key = `${doc.definition.toString()}-${doc.exerciseType.toString()}`;
    return !existingKeys.has(key);
  });

  if (docsToInsert.length) {
    await Trophy.insertMany(docsToInsert);
  }
};

module.exports = { initializeTrophyProgressForUser };
