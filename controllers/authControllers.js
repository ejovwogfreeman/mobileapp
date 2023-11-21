const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// const sendEmail = require("../middlewares/emailMiddleware");
const accessToken = require("../middlewares/accessTokenMiddleware");

/////////////////////////////
////////REGISTER USER////////
/////////////////////////////

const registerUser = async (req, res) => {
  const { email, password, accountType } = req.body;
  let hashedPassword = null;

  try {
    if (!email || !password || !accountType) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("user exists");
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: email.split("@")[0],
      email,
      accountType,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      const { password, ...others } = user._doc;
      const token = accessToken(user);

      // await sendEmail(email, "Welcome On Board", "html/register.html");

      return res.status(200).json({
        ...others,
        token,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
/////////LOGIN USER//////////
/////////////////////////////

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "please fill all fields" });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        const hashedPassword = user.password;
        const comparedPassword = await bcrypt.compare(password, hashedPassword);
        if (comparedPassword === true) {
          const { password, ...others } = user._doc;

          res.status(200).json({
            ...others,
            token: accessToken(user),
          });

          // await sendEmail(email, "Login Successful", "html/login.html");
        } else {
          res
            .status(400)
            .json({ message: "Invalid password, Please try again." });
        }
      } else {
        res
          .status(400)
          .json({ message: "A user with this email doesn't exist." });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
