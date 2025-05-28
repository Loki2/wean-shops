const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    //***************** User Basic Information *********************/
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address_1: {
      type: String,
      default: "",
    },
    address_2: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    province: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    mentalStatus: {
      type: String,
      default: "",
    },
    blood: {
      type: String,
      default: "",
    },      
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
