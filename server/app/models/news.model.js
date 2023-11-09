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
      cover_photo: {
        type: String,
        require: false,
      },
      content:{
        type: String,
        required: true,
      },
      video:{
        type: String,
        required: false,
      }
    },
    { timestamps: true }
  )
  module.exports = mongoose.model("News", NewsSchema)