const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        require: true,
        unique: true,
      },
      desc: {
        type: String,
        require: true,
      },
      author: {
        type: String,
        require: true,
      },
      content:{
        type: String,
        required: true,
      },
      docs: {
        type: [String],
      },
    },
    { timestamps: true }
  )
  module.exports = mongoose.model("News", NewsSchema)