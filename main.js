require("dotenv").config();
require("./database");

const bot = require("./core/bot");
const stage = require("./scenes");
const startBot = require("./utils/startBot");
const session = require('./core/session');


bot.use(session);
bot.use(stage.middleware());

bot.start(ctx => ctx.scene.enter("start"));

bot.catch((err, ctx) => {
    console.log(err);
    if (ctx.chat.type === "private") {
        ctx.reply("errorcha");
    }
});

startBot(bot);