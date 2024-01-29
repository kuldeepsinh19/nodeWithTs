"use strict";
const movieController = require("./movieController");
var express = require("express");
var router = express.Router();
var session = require("express-session");
const movieAuthentication = require("../Authentication/authenticateFunc");
const moviesValidation = require("./moviesValidations");
/* GET movie */
router.get("/", movieController.getAllMovies);
// router.get("/", movieAuthentication.isAuthenticated, movieController.getAllMovies);
router.post("/", movieAuthentication.isAuthenticated, movieAuthentication.userRole, moviesValidation.insertMovieData, movieController.insertMovie);
// router.post("/", validation.insertMovieData, movieController.insertMovie);
router.delete("/:id", movieAuthentication.isAuthenticated, movieAuthentication.userRole, moviesValidation.deleteMovie, movieController.deleteMovieById);
router.put("/", movieAuthentication.isAuthenticated, movieAuthentication.userRole, moviesValidation.updateMovieData, movieController.updateMovieById);
router.get("/name", movieAuthentication.isAuthenticated, movieController.cinemaListByMovieName);
router.get("/seating-plan", movieAuthentication.isAuthenticated, movieController.cinemaSeatingPlan);
router.get("/top-actors", movieAuthentication.isAuthenticated, movieController.topActors);
module.exports = router;
