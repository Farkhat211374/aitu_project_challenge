const News = require('../models/news.model')

exports.create = async (req, res) => {
    try {
      const news = await News.create({
        title: req.body.title,
        desc: req.body.desc,
        author: req.body.author,
        content: req.body.content,
        docs: req.body.docs
      })
      res.status(201).json(news)
    } catch (err) {
      res.status(500).json(err)
    }
  }

exports.getAll = async (req, res) => {
    try {
      const news = await News.find({}).sort('-position')
      res.status(200).json(news)
    } catch (err) {
      res.status(500).json(err)
    }
}

exports.getOne = async (req, res) => {
    const { newsId } = req.params
    try {
      const news = await News.findOne({_id: newsId })
      if (!news) return res.status(404).json('News not found')
      res.status(200).json(news)
    } catch (err) {
      res.status(500).json(err)
    }
  }


  exports.update = async (req, res) => {
    const { newsId } = req.params
    const { title} = req.body  
    try {
      const news = await News.findOneAndUpdate(
        {_id: newsId},
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(news)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  exports.delete = async (req, res) => {
    const { newsId } = req.params
    try {
      await News.deleteOne({ _id: newsId })
      res.status(200).json('deleted succesfully!')
    } catch (err) {
      res.status(500).json(err)
    }
  }