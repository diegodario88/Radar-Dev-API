const devRepository = require('../repositories/devRepository')
const parseStringAsArray = require('../../utils/parseStringAsArray')

module.exports = {

    async getByQuery(req, res) {

        const { latitude, longitude, techs } = req.query

        const techsArray = parseStringAsArray(techs)

        const devs = await devRepository.search({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [latitude, longitude]
                    },
                    $maxDistance: 90000,
                }
            }
        })

        if (devs) return res.status(200).json(devs)

        return res.status(400)
            .json({ message: 'Bad request! dev do not exist' })

    }
}