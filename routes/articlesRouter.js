const express = require('express')

const articlesController = require('../controllers/articlesController')
const { includePayload } = require('../middleware/article')()
const article = require('../middleware/article')

function routes(Article) {
  const articlesRouter = express.Router()
  const controller = articlesController(Article)
  const { fetchArticle } = article(Article)

  articlesRouter.use('/articles', includePayload)
  articlesRouter
    .route('/articles')
    .post(controller.createArticle)
    .get(controller.getArticleList)

  articlesRouter.use('/articles/:slug', fetchArticle)
  articlesRouter
    .route('/articles/:slug')
    .get(controller.getArticle)
    .patch(controller.patchArticle)
    .delete(controller.deleteArticle)

  return articlesRouter
}

module.exports = routes
