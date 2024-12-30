const express = require("express");

const AuthMiddleware = require("../middlerwares/auth.middleware");
const MapController = require("../controllers/map.controller");

const router = express.Router();

router.get(
  "/get-coordinates",
  AuthMiddleware.authUser,
  MapController.getCoordinates
);
router.get(
  "/get-distance-time",
  AuthMiddleware.authUser,
  MapController.getDistanceTime
);
router.get(
  "/get-suggestions",
  AuthMiddleware.authUser,
  MapController.getAutoCompeteSuggestions
);

module.exports = router;
