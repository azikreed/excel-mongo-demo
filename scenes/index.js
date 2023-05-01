const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
    require('./start'),
    ...require("./excel"),
]);

module.exports = stage;