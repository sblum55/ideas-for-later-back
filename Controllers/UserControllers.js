const models = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

const userControllers = {}

userControllers.create = async (req, res) => {
    // console.log('req response sign up', req);
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        console.log('userController sign up', user);
        console.log('sign up userid', user.id);
        console.log('process.env', JWT_SECRET);
        const encryptedId = await jwt.sign({userId: user.id}, JWT_SECRET)
        console.log('encryptedId', encryptedId);
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
    // console.log('req response', req);
    // console.log('res response', res);
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })

        console.log('userController Login', user);

        const validPassword = await bcrypt.compareSync(req.body.password, user.password)
        const encryptedId = await jwt.sign({userId: user.id}, JWT_SECRET)
        // console.log(encryptedId);
        if (validPassword) {
            // res.json({user, encryptedId, message: 'login successful'})
            res.json({user: {
                id: encryptedId,
                email: user.email,
                password: validPassword
            }})
        } else {
            res.status(400).json({message: 'login failed'})
        }
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

userControllers.verify = async (req, res) => {
    // console.log('user verify', req.headers);
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, JWT_SECRET)

        // console.log('encrypted', encryptedId);
        // console.log('decrypted', decryptedId);

        const user = await models.user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        if (user) {
            res.json({user: encryptedId, message: 'user found'})
        } else {
            res.status(400).json({error: error.message})
        }
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

module.exports = userControllers