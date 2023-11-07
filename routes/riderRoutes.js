const express = require("express");
const { acceptRide, cancelRide } = require("../controllers/adminConterollers");
const rider = require("../middlewares/riderMiddleware");

const router = express.Router();

router.get("/accept_ride", rider, acceptRide);
router.get("/cancel_ride", rider, cancelRide);

module.exports = router;
