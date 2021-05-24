const ideaRoutes = require('express').Router()

const ideaControllers = require('../Controllers/IdeaControllers')

ideaRoutes.get('/', ideaControllers.index)
ideaRoutes.get('/favorite', ideaControllers.indexFav)
ideaRoutes.post('/favorite', ideaControllers.favorite)
ideaRoutes.put('/favorite/:ideaId', ideaControllers.complete)

module.exports = ideaRoutes