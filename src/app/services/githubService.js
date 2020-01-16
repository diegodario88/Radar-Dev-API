const axios = require('axios');

const githubService = async (user) => {
    try {
        const gitUrl = 'https://api.github.com/users/'
        const reponse = await axios.get(`${gitUrl}${user}`)
        return reponse.data

    } catch (error) {
        console.log("\x1b[31m", `GitHub Service error ${error}`)
    }
}

module.exports = githubService