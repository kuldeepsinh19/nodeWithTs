var express = require("express");
const authRouter = express.Router();
const controller = require("./authenticationController");
const logOutController = require("./authenticateFunc");
// console.log("IT CAME THROUGH THE ROUTES ")
authRouter.post("/login", controller.loginUser);
authRouter.delete("/logout", logOutController.logOutUser);

module.exports = authRouter;
