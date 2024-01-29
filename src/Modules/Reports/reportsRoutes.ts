var express = require("express");
var router = express.Router();
const reportsController = require("./reportsController");
const authentication = require("../Authentication/authenticateFunc");

router.get(
  "/top-customers",
  authentication.isAuthenticated,
  authentication.userRole,
  reportsController.topCustomerList
);
router.get(
  "/bookings",
  authentication.isAuthenticated,
  authentication.userRole,
  reportsController.bookingListByCinemaName
);
router.get(
  "/unique-customers",
  authentication.isAuthenticated,
  authentication.userRole,
  reportsController.uniqueCustomerList
);
router.get(
  "/movie",
  authentication.isAuthenticated,
  authentication.userRole,
  reportsController.viewersListByMovieName
);
router.get(
  "/cinema",
  authentication.isAuthenticated,
  authentication.userRole,
  reportsController.viewersListByCinemaName
);

module.exports = router;
