const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;
  if (!DB_URL) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    process.exit(1); // Exit if no DB URL is provided
}

// Connect to the database
mongoose.connect(DB_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1); // Exit the process on connection failure
    });
}
  const db = mongoose.connection;

  db.on("error", console.error.bind("Connection Error"));
  db.once("open", function () {
    console.log("Database Connected!");
  });

// CRUD => Create, Read, Update & Delete
module.exports = DbConnection;