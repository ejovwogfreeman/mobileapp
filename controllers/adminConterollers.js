const User = require("../models/userModel");
const Ride = require("../models/rideModel");
const Verify = require("../models/verifyModel");

/////////////////////////////
////////GET ALL USERS////////
/////////////////////////////
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

/////////////////////////////
////////GET SINGLE USER//////
/////////////////////////////
const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.find(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////
/////////////FUND USER/////////////
///////////////////////////////////

const fundUser = async (req, res) => {
  const { id, amount } = req.body;

  const user = await User.findById(id);

  const bal = Number(user.balance) + Number(amount);

  await User.findByIdAndUpdate(id, {
    balance: Number(bal),
  });
  res.status(200).json({ message: "Funded Successfully" });
};

/////////////////////////////////
/////////VERIFY A RIDE///////////
/////////////////////////////////
const verifyRider = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.accountType === "rider" && user.verifiedDoc) {
      user.isVerified = true;

      await user.save();

      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json({ error: "User does not have a verified document" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to accept the user" });
  }
};

/////////////////////////////////
/////////ACCEPT A RIDE///////////
/////////////////////////////////
const acceptRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { status: "accepted" },
      { new: true }
    );

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: "Failed to accept the ride" });
  }
};

/////////////////////////////////
//////////CANCEL A RIDE//////////
/////////////////////////////////
const cancelRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.status === "completed") {
      return res.status(400).json({ error: "Cannot cancel a completed ride" });
    }

    ride.status = "canceled";
    await ride.save();

    return res.status(200).json({ message: "Ride canceled successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to cancel the ride" });
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  fundUser,
  acceptRide,
  cancelRide,
  verifyRider,
};
