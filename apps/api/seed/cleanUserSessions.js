// Command to run: node seed/cleanUserSessions.js

const mongoose = require("mongoose");
const Session = require("../models/session.model");
const User = require("../models/user.model");

mongoose.connect(
  "mongodb+srv://admin-test:yqbvFFLNMy9nG3Mo@hero-app.p7ekmkz.mongodb.net/?retryWrites=true&w=majority&appName=hero-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const cleanUserSessions = async () => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: "pro.julien.thomas@gmail.com" });
    if (!user) {
      console.error("User not found!");
      return;
    }

    console.log("User found:", user.email);

    // Find all sessions for this user with 0 exercises (empty exercise_user_list)
    const sessionsToDelete = await Session.find({
      owner: user._id,
      exercise_user_list: { $size: 0 },
    });

    console.log(
      `Found ${sessionsToDelete.length} sessions with 0 exercises for user ${user.email}`
    );

    if (sessionsToDelete.length > 0) {
      // Log details of sessions that will be deleted
      console.log("Sessions to be deleted:");
      sessionsToDelete.forEach((session, index) => {
        console.log(
          `Session ${index + 1}: ID=${session._id}, Date=${session.date_session}, Type=${session.type_session}, Exercise Count=${session.exercise_user_list.length}`
        );
      });

      // Delete the sessions
      const result = await Session.deleteMany({
        owner: user._id,
        exercise_user_list: { $size: 0 },
      });

      console.log(
        `\nSuccessfully deleted ${result.deletedCount} sessions with 0 exercises`
      );
    } else {
      console.log("No sessions with 0 exercises found for this user");
    }
  } catch (error) {
    console.error("Error cleaning user sessions:", error);
  } finally {
    mongoose.connection.close();
  }
};

cleanUserSessions();
