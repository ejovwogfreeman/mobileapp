const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: [Object],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    balance: {
      type: Number,
    },
    accountType: {
      type: String,
      enum: ["user", "rider"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        coordinates: [Number],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
