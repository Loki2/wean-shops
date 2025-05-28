const mongoose = require('mongoose');


const volentearSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    desc:{
      type: String,
      required: true
    },
    image:{
      type: String,
      required: true
    },
    remark: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Volentear = mongoose.model("Volentear", volentearSchema);

module.exports = Volentear;