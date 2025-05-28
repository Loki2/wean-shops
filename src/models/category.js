const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;