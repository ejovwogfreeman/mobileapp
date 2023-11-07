const Ride = require("../models/rideModel");

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
  acceptRide,
  cancelRide,
};
