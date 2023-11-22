const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Ride = require("../models/rideModel");
// const sendEmail = require("../middlewares/emailMiddleware");
const accessToken = require("../middlewares/accessTokenMiddleware");

/////////////////////////////
//////GET A SINGLE USER//////
/////////////////////////////
const getUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  const { ...others } = user._doc;
  res.send({
    ...others,
    token: accessToken(user),
  });
};

/////////////////////////////
//////////UPDATE USER////////
/////////////////////////////
const updateUser = async (req, res) => {
  const {
    oldPassword,
    password,
    fullName,
    username,
    email,
    phoneNumber,
    accountType,
    location,
    address,
    work,
  } = req.body;

  if (password && oldPassword) {
    const user = await User.findById(req.user._id);

    // compare the password and send
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.user._id, { password: hashedpassword });
      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res
        .status(400)
        .json({ message: "Old Password is not correct", error: true });
    }
  }

  if (req.files && req.files.length > 0) {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
      filesArray.push(file);
    });
    await User.findByIdAndUpdate(req.user._id, { profileImage: filesArray });
  }

  if (fullName && fullName !== "null") {
    await User.findByIdAndUpdate(req.user._id, { fullName: fullName });
  }

  if (username && username !== "null") {
    await User.findByIdAndUpdate(req.user._id, { username: username });
  }

  if (email && email !== "null") {
    await User.findByIdAndUpdate(req.user._id, { email: email });
  }

  if (phoneNumber && phoneNumber !== "null") {
    await User.findByIdAndUpdate(req.user._id, { phoneNumber: phoneNumber });
  }

  if (accountType && accountType !== "null") {
    await User.findByIdAndUpdate(req.user._id, { accountType: accountType });
  }

  if (location && location !== "null") {
    await User.findByIdAndUpdate(req.user._id, { location: location });
  }

  if (address && address !== "null") {
    await User.findByIdAndUpdate(req.user._id, { address: address });
  }

  if (work && work !== "null") {
    await User.findByIdAndUpdate(req.user._id, { work: work });
  }

  res.status(200).json({ message: "Profile Updated Successfully" });
};

/////////////////////////////
///////CHANGE PASSWORD///////
/////////////////////////////

const changePassword = async (req, res) => {
  const { oldPassword, password } = req.body;

  if (password && oldPassword) {
    const user = await User.findById(req.user._id);
    const oldhashedPassword = user.password;
    const comparedPassword = await bcrypt.compare(
      oldPassword,
      oldhashedPassword
    );
    if (user && comparedPassword === true) {
      if (oldPassword === password) {
        return res
          .status(400)
          .send({ message: "Old password cannot be thesame as new password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.user._id, { password: hashedpassword });

      const user = await User.findById(req.user._id);

      const email = user.email;

      // await sendEmail(
      //   email,
      //   "Password Changed Successfully",
      //   "html/change_password.html"
      // );

      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(400).json({ message: "Old Password is not correct" });
    }
  }
};

//////////////////////////////
////////FORGOT PASSWORD///////
//////////////////////////////

const forgotPasword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    // await sendEmail(email, "Password Reset", "html/reset.html");
    res.status(200).json({ message: "An email has been sent to you" });
  } else {
    res.status(400).json({
      message: "We could not find an account with that email",
    });
  }
};

/////////////////////////////
////////RESET PASSWORD///////
/////////////////////////////

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const oldhashedPassword = user.password;
  const comparedPassword = await bcrypt.compare(password, oldhashedPassword);

  if (comparedPassword === true) {
    return res
      .status(400)
      .send({ message: "Old password cannot be thesame as new password" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    return res.status(500).json({ message: "Password update failed" });
  }

  // await sendEmail(
  //   email,
  //   "Password Reset Successful",
  //   "html/reset_password_successful.html"
  // );

  return res.status(200).json({ message: "Password reset is successful" });
};

/////////////////////////////////
///////////BOOK A RIDE///////////
/////////////////////////////////
const bookRide = async (req, res) => {
  const { passengerId, driverId } = req.body;

  try {
    const newRide = new Ride({
      passenger: passengerId,
      driver: driverId,
      status: "pending",
    });

    await newRide.save();

    return res.status(201).json(newRide);
  } catch (error) {
    return res.status(500).json({ error: "Failed to book a ride" });
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
  getUser,
  updateUser,
  changePassword,
  forgotPasword,
  resetPassword,
  bookRide,
  cancelRide,
  updateUser,
};
