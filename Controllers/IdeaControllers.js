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
    console.log('idea controllers', req.headers);
    try {

        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        // console.log('encrypt id', encryptedId);
        // console.log('decrypt id', decryptedId);

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        
        const favIdea = await models.idea.findOne({
            where: {
                id: req.body.id
            }
        })

        console.log('fav idea req', favIdea);
        // console.log('favIdea', favIdea);
        // console.log(user);
        await user.addIdea(favIdea)
        res.json({favIdea})

    } catch (error) {
        console.log(error);
        res.status(400).json({error: message})
    }
}

ideaControllers.indexFav = async (req, res) => {
    try {

        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        // console.log('encrypt id', encryptedId);
        // console.log('decrypt id', decryptedId);

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        const favIdea = await user.getIdeas()
        // console.log(favIdea);
        
        res.json({ favIdea })

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

ideaControllers.complete = async (req, res) => {
    console.log(req.headers, 'complete controller');
    try {
        const encryptedId = req.headers.authorization
        console.log('encryp id', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)
        console.log('decrypt id', decryptedId);

        // const user = await models.user.findOne({
        //     where: {
        //         id: decryptedId.userId
        //     }
        // })

        // console.log('complete', user);

        // const idea = await models.idea.findOne({
        //     where: {
        //         id: req.params.ideaId,
        //     }
        // })

        // console.log('complete idea', idea);

        const complete = await models.user_idea.findOrCreate({
            where: {
                userId: decryptedId.userId,
                ideaId: req.params.ideaId,
                completed: req.body.completed
            }
        })

        console.log(complete);

        await user.addIdea(idea)
        res.json({ complete })

    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = ideaControllers