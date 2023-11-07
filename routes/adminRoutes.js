const express = require("express");
const {
  getUsers,
  getSingleUser,
  fundUser,
  acceptRide,
  cancelRide,
} = require("../controllers/adminConterollers");
const admin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/users", admin, getUsers);
router.get("/user:id", admin, getSingleUser);
router.get("/fund_user", admin, fundUser);
router.get("/accept_ride", admin, acceptRide);
router.get("/cancel_ride", admin, cancelRide);

module.exports = router;
