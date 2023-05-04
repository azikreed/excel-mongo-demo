const { Scenes } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.BaseScene('excel:send');

scene.enter(async (ctx) => {
    const users = await db.controllers.users.getMany();

    const date = new Date();
    
    const data = await excel.generateDb({
        users,
    });

    ctx.replyWithDocument({ source: data, filename: "baza.xlsx" });
    ctx.scene.enter("start");
});

module.exports = scene;