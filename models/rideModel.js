const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    pickupLocation: {
      type: {
        type: String,
        required: true,
      },
    },
    dropoffLocation: {
      type: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);

// const mongoose = require("mongoose");

// const rideSchema = new mongoose.Schema(
//   {
//     passenger: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     driver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     status: {
//       type: String,
//       enum: ["pending", "accepted", "completed"],
//       required: true,
//     },
//     pickupLocation: {
//       type: {
//         type: String,
//         enum: ["Point"],
//         required: true,
//       },
//       coordinates: {
//         type: [Number],
//         required: true,
//       },
//     },
//     dropoffLocation: {
//       type: {
//         type: String,
//         enum: ["Point"],
//         required: true,
//       },
//       coordinates: {
//         type: [Number],
//         required: true,
//       },
//     },

//     fare: {
//       type: Number,
//       required: true,
//     },
//     distance: {
//       type: Number,
//       required: true,
//     },
//     startTime: {
//       type: Date,
//       required: true,
//     },
//     endTime: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// rideSchema.index({ pickupLocation: "2dsphere", dropoffLocation: "2dsphere" });

// module.exports = mongoose.model("Ride", rideSchema);
