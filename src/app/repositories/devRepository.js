const Dev = require('../models/Dev')

module.exports = {

    async findOne(id) {
        try {
            return await Dev.findOne({ _id: id })

        } catch (error) {
            return console.log("\x1b[31m", `Cannot find your dev! ${error}`);
        }
    },

    async findByName(name) {
        try {
            return await Dev.findOne({})
                .where('github_username').equals(name);

        } catch (error) {
            return console.log("\x1b[31m", `Cannot find your dev by name! ${error}`);
        }
    },

    async findAll() {
        try {
            return await Dev.find({})

        } catch (error) {
            return console.log("\x1b[31m", `houston we got a problem finding our dev ${error}`);
        }
    },

    async save(params) {
        try {

            return await Dev.create(params)

        } catch (error) {
            return console.log("\x1b[31m", `We can't create, why? ${error}`);
        }
    },

    async update(filter, params) {
        try {

            return await Dev.updateOne(filter, params)

        } catch (error) {
            return console.log("\x1b[31m", `We can't update, why? ${error}`);
        }
    },

    async remove(filter) {
        try {

            await Dev.deleteOne(filter)

        } catch (error) {
            return console.log("\x1b[31m", `We can't remove this guy, why? ${error}`);
        }
    },

    //Search

    async search(query) {
        try {
                        
            return await Dev.find(query)

        } catch (error) {
            return console.log("\x1b[31m", `houston we got a problem finding our dev ${error}`);
        }
    }
}
