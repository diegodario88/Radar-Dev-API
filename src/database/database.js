const mongoose = require('mongoose');
require('dotenv').config();

const config = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

mongoose.connect(
    process.env.MONGO_URL,
    config
)

console.log('\x1b[32m', 'Connection established successfully, mongoDB is operating!');

module.exports = mongoose;