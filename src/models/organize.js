const mongoose = require('mongoose');


const orgSchema = new mongoose.Schema(
  {
    name_lao:{
        type: String,
        required: true
    },
    name_eng:{
      type: String,
      required: true
    },
    desc:{
      type: String,
      required: true
    },
    bio: {
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
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    chart:{
      type: String,
      required: true
    },
    found_date: {
        type: Date
    }
  },
  {
    timestamps: true
  }
)

const Organize = mongoose.model("Organize", orgSchema);

module.exports = Organize;