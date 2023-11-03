const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ["Point"],
      coordinates: [Number],
    },
    required: true,
  },
  dropoffLocation: {
    type: {
      type: String,
      enum: ["Point"],
      coordinates: [Number],
    },
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
});

rideSchema.index({ pickupLocation: "2dsphere", dropoffLocation: "2dsphere" });

module.exports = mongoose.model("Ride", rideSchema);
