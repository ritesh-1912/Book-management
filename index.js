const express = require("express");
const DbConnection = require("./dbConnection.js");
const dotenv = require("dotenv");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");
const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app = express();
DbConnection();
const PORT = 8081;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running succesfully",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
