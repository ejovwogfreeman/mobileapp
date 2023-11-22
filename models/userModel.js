const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      type: String,
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
    verifiedDoc: [Object],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
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
    address: {
      type: String,
    },
    work: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
