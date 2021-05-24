const models = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const ideaControllers = {}

ideaControllers.index = async (req, res) => {
    try {
        const ideas = await models.idea.findAll({
            order: [['id', 'ASC']]
        })

        res.json((ideas))
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

ideaControllers.favorite = async (req, res) => {
    // console.log('idea controllers', req);
    try {

        // const encryptedId = req.headers.authorization
        // const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        // console.log('encrypt id', encryptedId);
        // console.log('decrypt id', decryptedId);

        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        
        const favIdea = await models.idea.findOne({
            where: {
                id: req.body.id
            }
        })

        console.log('fav idea req', favIdea);
        // console.log('favIdea', favIdea);
        console.log(user);
        await user.addIdea(favIdea)
        res.json({favIdea})

    } catch (error) {
        console.log(error);
        res.status(400).json({error: message})
    }
}

ideaControllers.indexFav = async (req, res) => {
    try {

        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })

        const favIdea = await user.getIdeas()

        res.json({ favIdea })

    } catch (error) {
        console.log(error);
        res.status(400).json({error: message})
    }
}

module.exports = ideaControllers