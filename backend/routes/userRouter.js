const express = require("express");
const {
  userRegister,
  deleteUser,
 login,
 getAllUsers
} = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post("/create", userRegister);
userRouter.delete("/delete/:username", deleteUser);
userRouter.post("/login",login)
userRouter.get("/",getAllUsers)

module.exports = userRouter;
