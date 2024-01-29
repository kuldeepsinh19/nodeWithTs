var express = require("express");
var router = express.Router();
const cityValidation = require("./citiesValidations");
const cityController = require("./cityController");
const cityAuth = require("../Authentication/authenticateFunc");

router.get("/", cityAuth.isAuthenticated, cityController.getAllCities);
router.post(
  "/",
  cityAuth.isAuthenticated,
  cityAuth.userRole,
  cityValidation.insertCityData,
  cityController.insertCity
);
router.delete(
  "/:id",
  cityAuth.isAuthenticated,
  cityAuth.userRole,
  cityValidation.deleteCityData,
  cityController.deleteCity
);
router.put(
  "/",
  cityAuth.isAuthenticated,
  cityAuth.userRole,
  cityValidation.updateCityData,
  cityController.updateCityById
);

module.exports = router;
