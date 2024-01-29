var express = require("express");
var router = express.Router();
const cinemaController = require("./cinemaController");
const auth = require("../Authentication/authenticateFunc");
const validation = require("./cinemaValidations");

router.get("/", auth.isAuthenticated, cinemaController.getALlCinemas);
router.post(
  "/",
  auth.isAuthenticated,
  auth.userRole,
  validation.insertCinemaData,
  cinemaController.insertCinema
);
router.delete(
  "/:id",
  auth.isAuthenticated,
  auth.userRole,
  validation.deleteCinemaData,
  cinemaController.deleteCinemaById
);
router.put(
  "/",
  auth.isAuthenticated,
  auth.userRole,
  validation.updateCinemaData,
  cinemaController.updateCinemaById
);
router.get(
  "/city-name",
  auth.isAuthenticated,
  cinemaController.cinemaListByCityName
);
router.get(
  "/cinema-name",
  auth.isAuthenticated,
  cinemaController.movieListByCinemaName
);
module.exports = router;
