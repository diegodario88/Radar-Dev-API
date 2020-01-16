require('dotenv').config()
const axios = require('axios');

const geoService = async (adress) => {
    try {
        const key = process.env.GEO_KEY
        const [street, number, district, city] = adress.split(',')
        const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        const url = encodeURI(`${baseUrl}${street}+${number}+${district}+${city}+Brazil&key=${key}`)

        const result = await axios.get(url)

        return result.data.results[0].geometry.location

    } catch (error) {
        console.log("\x1b[31m", `Geo Service error ${error}`)
    }

}

module.exports = geoService