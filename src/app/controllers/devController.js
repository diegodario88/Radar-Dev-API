const githubService = require('../services/githubService')
const devRepository = require('../repositories/devRepository')
const geoService = require('../services/geoService')
const parseStringAsArray = require('../../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../../wesocket')

module.exports = {

    async getAll(req, res) {
        const devs = await devRepository.findAll()

        if (devs) return res.status(200).json(devs)

        return res.status(400)
            .json({ message: 'Bad request! dev do not exist' })
    },

    async getOne(req, res) {
        const dev = await devRepository.findOne(req.params.id)

        if (dev) return res.status(200).json(dev)

        return res.status(400)
            .json({ message: 'Bad request! dev do not exist' })
    },

    async getByName(req, res) {
        const dev = await devRepository.findByName(req.params.name)

        if (dev) return res.status(200).json(dev)

        return res.status(400)
            .json({ message: 'Bad request! dev do not exist' })
    },

    async store(req, res) {

        const { github_username, techs, adress, loc } = req.body

        let dev = await devRepository.findByName(github_username)

        if (!dev) {

            const { name = login, avatar_url, bio, } = await githubService(github_username)
            let latitude, longitude

            if (adress) {
                const geoLoc = await geoService(adress)
                latitude = geoLoc.lat; longitude = geoLoc.lng
                console.log(geoLoc);

            } else {
                latitude = loc.latitude; longitude = loc.longitude
            }

            const techsArray = parseStringAsArray(techs)

            dev = await devRepository.save({
                name,
                github_username,
                avatar_url,
                techs: techsArray,
                bio,
                location: {
                    type: 'Point',
                    coordinates: [latitude, longitude]
                }
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude }, techsArray)

            sendMessage(sendSocketMessageTo, 'new-dev', dev)

            return res.status(200).json(dev)
        }

        return res.status(409)
            .json({ message: 'Conflict! dev already exists' })
    },

    async edit(req, res) {

        const { github_username, techs, adress } = req.body

        let dev = await devRepository.findByName(github_username)

        if (!dev) {
            return res.status(400)
                .json({ message: 'Bad request! dev do not exist' })
        }

        const { name = login, avatar_url, bio, } = await githubService(github_username)
        const geoLocation = await geoService(adress)

        const location = {
            type: 'Point',
            coordinates: [
                geoLocation.lng,
                geoLocation.lat
            ]
        }
        dev = await devRepository.update({ _id: dev._id }, {
            name,
            avatar_url,
            techs: parseStringAsArray(techs),
            bio,
            location
        })

        return res.status(200)
            .json({ message: `Dev ${name} updated successfully` })
    },

    async delete(req, res) {
        const dev = await devRepository.findOne(req.params.id)

        if (dev) {

            await devRepository.remove({ _id: req.params.id })

            return res.status(200)
                .json({ message: `Good Bye! dev ${dev.github_username} deleted successfully` })
        }

        return res.status(400)
            .json({ message: 'Bad request! dev do not exist' })

    }

}
