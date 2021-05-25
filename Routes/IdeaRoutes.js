const ideaRoutes = require('express').Router()

const ideaControllers = require('../Controllers/IdeaControllers')

ideaRoutes.get('/', ideaControllers.index)
ideaRoutes.get('/favorite', ideaControllers.indexFav)
ideaRoutes.get('/favorite/complete', ideaControllers.indexComplete)
ideaRoutes.post('/favorite', ideaControllers.favorite)
ideaRoutes.post('/create', ideaControllers.createIdea)
ideaRoutes.put('/favorite/:ideaId', ideaControllers.complete)

module.exports = ideaRoutes