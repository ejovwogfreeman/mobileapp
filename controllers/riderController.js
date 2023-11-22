const Ride = require("../models/rideModel");
const Verify = require("../models/verifyModel");
const User = require("../models/userModel");

////////////////////////////////////////////
//////////SEND VERIFICATION DOCUMENT////////
////////////////////////////////////////////
const riderVerify = async (req, res) => {
  const { verifiedDoc } = req.body;
  const { email, username, _id } = req.user;

  if (!verifiedDoc) {
    return res.send({ message: "Please add all fields", error: true });
  }

  try {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
      filesArray.push(file);
    });

    const verifyOptions = {
      verifiedDoc,
      verifiedPic: filesArray,
      status: false,
    };

    console.log(verifyOptions);

    let verifyId;

    try {
      const verify = await Verify.create(verifyOptions);
      verifyId = verify.id;
      verify.user.id = _id;
      verify.user.email = email;
      verify.user.username = username;

      await verify.save();

      const user = await User.findById(_id);
      user.verify.push(verifyId);

      await user.save();
    } catch (err) {
      return res.status(400).json(err);
    }

    res.status(201).json({ message: "Files Uploaded Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message, error: true });
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
  acceptRide,
  cancelRide,
  riderVerify,
};
