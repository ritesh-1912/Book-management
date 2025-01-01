const mongoose = require("mongoose");

function DbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error Detected"));
db.once("open", function(){
    console.log("DB Connected");
});
module.exports = DbConnection;
