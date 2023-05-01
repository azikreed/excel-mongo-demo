const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.MONGO_URI)
.then(() => console.log("MongoDB connected success!"))
.catch((e) => console.log(e));

const db = {
    controllers: require('./controllers'),
    models: require('./models')
};

module.exports = db;