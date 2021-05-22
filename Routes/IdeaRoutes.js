const ideaRoutes = require('express').Router()

const ideaControllers = require('../Controllers/IdeaControllers')

ideaRoutes.get('/', ideaControllers.index)

module.exports = ideaRoutes