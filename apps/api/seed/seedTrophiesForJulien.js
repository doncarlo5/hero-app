const mongoose = require("mongoose");
const User = require("../models/user.model");
const ExerciseType = require("../models/exercise-type.model");
const Session = require("../models/session.model");
const { initializeTrophyProgressForUser } = require("../src/trophy-progress");
const trophyModule = require("../api/trophy");
const { checkAndAwardTrophies } = trophyModule;

// MongoDB connection
mongoose.connect(
  "mongodb+srv://admin-test:yqbvFFLNMy9nG3Mo@hero-app.p7ekmkz.mongodb.net/?retryWrites=true&w=majority&appName=hero-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Main function to award trophies to a specific user by email
const awardTrophiesToSpecificUser = async () => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });
    if (!user) {
      console.error("User not found!");
      return;
    }

    console.log(`Processing user: ${user.email}`);

    // Fetch all exercise types for the user to ensure trophies exist for each
    const exerciseTypes = await ExerciseType.find({ owner: user._id });
    await initializeTrophyProgressForUser(user._id, exerciseTypes);

    // Fetch all exercise sessions for the user
    const sessions = await Session.find({ owner: user._id }).populate(
      "exercise_user_list"
    );

    // Iterate through each session
    for (const session of sessions) {
      // Iterate over each exercise user in the session
      for (const exerciseUser of session.exercise_user_list) {
        // Fetch the exercise type details
        const exerciseType = await ExerciseType.findById(exerciseUser.type);

        if (!exerciseType) {
          console.log(
            `Exercise type not found for exerciseUser: ${exerciseUser._id}`
          );
          continue;
        }

        await checkAndAwardTrophies({
          _id: exerciseUser._id,
          type: exerciseUser.type,
          weight: exerciseUser.weight,
          rep: exerciseUser.rep,
          session: session._id,
          owner: user._id,
        });
      }
    }
  } catch (error) {
    console.error("Error awarding trophies:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the trophy awarding process for the specific user
awardTrophiesToSpecificUser();
