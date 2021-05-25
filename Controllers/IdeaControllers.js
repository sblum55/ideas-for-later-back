const models = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const ideaControllers = {}

ideaControllers.index = async (req, res) => {
    try {
        const ideas = await models.idea.findAll({
            order: [['createdAt', 'DESC']]
        })

        res.json((ideas))
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

ideaControllers.favorite = async (req, res) => {
    // console.log('idea controllers', req.headers);
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
        res.status(400).json({error: error.message})
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
    // console.log(req.headers, 'complete controller');
    try {
        const encryptedId = req.headers.authorization
        console.log('encryp id', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)
        console.log('decrypt id', decryptedId);

        const findInfo = await models.user_idea.findOne({
            where: {
                userId: decryptedId.userId,
                ideaId: req.params.ideaId,
            },
        })

        findInfo.completed = req.body.completed
        const completed = await findInfo.save()
        res.json({ completed })

    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

ideaControllers.indexComplete = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        const findInfo = await models.user_idea.findAll({
            where: {
                userId: decryptedId.userId,
                completed: true
            }
        })

        res.json({ findInfo })

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

ideaControllers.createIdea = async (req, res) => {
    console.log('create idea headers', req.headers);
    try {
        const encryptedId = req.headers.authorization
        console.log('create idea encryp', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        console.log('create idea user', user);

        const idea = await models.idea.create({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description
        })
        console.log('create idea', idea);

        await user.addIdea(idea)
        // await idea.reload()

        res.json({ idea })

    } catch (error) {
        console.log('create idea error', error);
        res.status(400).json({error: error.message})
    }
}

module.exports = ideaControllers