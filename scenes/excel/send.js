const { Scenes } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.BaseScene('excel:send');

scene.enter(async (ctx) => {
    const users = await db.controllers.users.getMany();

    const data = await excel.generateDb({
        users
    });

    console.log("USERS===========", users)
    console.log("DATA============", data);

    ctx.replyWithDocument({source: data, filename: "baza.xlsx"})
});

module.exports = scene;