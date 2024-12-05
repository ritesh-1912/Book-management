const express = require("express");
const {users} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: None (depends on the route)
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});

app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`);
});