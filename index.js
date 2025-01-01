const express = require("express");
const dotenv = require("dotenv");
const DbConnection = require("./dbConnection");
dotenv.config();
DbConnection();
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("/", (req,res) => {
  res.status(200).json({
    message: "Server is up and running succesfully",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
