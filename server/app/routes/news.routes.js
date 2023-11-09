module.exports = app => {
    const router = require('express').Router()
    const { param } = require('express-validator')
    const validation = require('../middlewares/validation')
    const tokenHandler = require('../middlewares/tokenHandler')
    const newsController = require('../controllers/news.controller')
    var verifyToken = require('../middlewares/authJWT');
    
    
    router.post(
      '/',
      tokenHandler.verifyToken,
      newsController.create
    )
    
    router.get(
        '/',
        tokenHandler.verifyToken,
        newsController.getAll
    )

    router.get(
        '/:newsId',
        param('newsId').custom(value => {
        if (!validation.isObjectId(value)) {
         return Promise.reject('invalid id')
         } else return Promise.resolve()
        }),
        validation.validate,
        tokenHandler.verifyToken,
        newsController.getOne
    )

    router.put(
        '/:newsId',
        param('newsId').custom(value => {
        if (!validation.isObjectId(value)) {
         return Promise.reject('invalid id')
         } else return Promise.resolve()
        }),
        validation.validate,
        tokenHandler.verifyToken,
        newsController.update
      )

      router.delete(
        '/:newsId',
        param('newsId').custom(value => {
        if (!validation.isObjectId(value)) {
         return Promise.reject('invalid id')
         } else return Promise.resolve()
        }),
        validation.validate,
        tokenHandler.verifyToken,
        newsController.delete
      )
   
    
    app.use('/news', router);
    };