const models = require('../models')

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

module.exports = ideaControllers