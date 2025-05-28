const mongoose = require("mongoose");
const { roles } = require("../utils/constant");

const profileSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    age: {
      type: Number,
      required: true,
    },
    mentalStatus: {
      type: String,
      required: true
    },
    curr_address: {
      type: String,
      required: true
    },
    curr_city: {
      type: String,
      required: true
    },
    curr_province: {
      type: String,
      required: true
    },
    facebook: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;