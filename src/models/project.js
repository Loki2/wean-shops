const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema(
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
    },
    customer: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
)

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;