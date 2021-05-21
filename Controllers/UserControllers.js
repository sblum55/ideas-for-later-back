const models = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userControllers = {}

userControllers.create = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const encryptedId = await jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        res.json({user: {
            id: encryptedId,
            name: user.name,
            email: user.email
        }})
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        const encryptedId = await jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        if (validPassword) {
            res.json({user, encryptedId, message: 'login successful'})
        } else {
            res.status(400).json({message: 'login failed'})
        }
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.verify = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        if (user) {
            res.json({user: user.id, message: 'user found'})
        } else {
            res.status(400).json({error: error.message})
        }
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = userControllers