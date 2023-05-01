const config = require('./config');

const startBot = (bot, botConfig = {}) => {
    if (config.NODE_ENV === 'production') {
        botConfig.webhook = {
            domain: config.DOMAIN,
            port: config.PORT
        };
    }
    bot.launch(botConfig)
        .then(() => console.log(`Bot @${bot.botInfo.username} started!`));
};

module.exports = startBot;