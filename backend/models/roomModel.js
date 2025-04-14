//TODO: Schema of user:
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: {
          type: [Date],
        },
      },
    ],
  },
  { timestamps: true }
);

//TODO: Collection of Users:
const RoomCollection = mongoose.model("RoomCollection", roomSchema);

//TODO: Exporting the UserCollection:
module.exports = RoomCollection;
