const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require('./start'),
    ...require("./excel"),
    ...require("./user")
]);

module.exports = stage;