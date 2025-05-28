const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema(
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
    address_1:{
      type: String,
      required: true
    },
    address_2:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    },
    country:{
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    logo:{
      type: String,
      required: true
    },
    status:{
      type: String,
      required: true
    },
    remark:{
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;