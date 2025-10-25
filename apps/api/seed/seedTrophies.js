const mongoose = require("mongoose");
const ExerciseType = require("../models/exercise-type.model");
const User = require("../models/user.model");
const { initializeTrophyProgressForUser } = require("../src/trophy-progress");
const MONGODB_URI = process.env.MONGODB_URI;

console.log("Connecting to MongoDB...", `${MONGODB_URI}`);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initializeTrophies = async () => {
  try {
    const user = await User.findOne({ email: "testseed2@mail.com" });
    if (!user) {
      console.error("User not found!");
      return;
    }

    const userId = user._id;
    console.log("User found:", user);
    const exerciseTypes = await ExerciseType.find({ owner: userId });
    console.log("Exercise types found:", exerciseTypes);

    await initializeTrophyProgressForUser(userId, exerciseTypes);
    console.log("Trophies initialized successfully!");
  } catch (error) {
    console.error("Error initializing trophies:", error);
  } finally {
    mongoose.connection.close();
  }
};
