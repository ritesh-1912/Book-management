const express = require("express");
const {users} = require("../data/users.json");
const router = express.Router();
/**
 * Route: /users/
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: None (depends on the route)
 */

router.get("/users", (req,res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * http://localhost:8081/users/3
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by their ID
 * Access: Public
 * Parameters: ID
 */

router.get("/:id", (req,res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating/Adding a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID already exists",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    //201 is for updating the value to the server
    success: true,
    message: "User ID created successfully",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User data updated",
    data: updateUserData,
  });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Deleted User",
    data: users,
  });
});


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Getting User Sub details
 * Access: Public
 * Parameters: ID
 */
router.get("/subscription-details/:id", (req,res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User ID Does Not Exist",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if(data === ""){
      date = new Date();
    }
    else{
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    if ((user.subscriptionType === "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType === "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType === "Premium")) {
      date = date + 365;
    }
      return date;
  };

  let returnDateInDays = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
    fine: returnDateInDays < currentDate ? subscriptionExpiration <= currentDate ? 100
    : 50
    : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription Details for User: ",
    data,
  });
});

module.exports = router;
