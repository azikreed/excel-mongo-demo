const { Scenes, Markup } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.WizardScene('excel:send',
    (ctx) => {
        let text = `👇 Quyidagilardan birini tanlang...\n\nP.S: Hozircha faqat 3 minutlik ishlaydi :)`;
        let keyboard = Markup.keyboard([
            ["3️⃣ minutlik", "7️⃣ kunlik"],
            ["📅 1 oylik", "📊 Barchasi"],
            ["◀️ Orqaga"]
        ]).resize()

        ctx.reply(text, keyboard);
        ctx.wizard.next()
    },
    async (ctx) => {
        let option = ctx.message.text;
        let users;
        if (option == "◀️ Orqaga") {
            return ctx.scene.enter("start");
        }
        if (option == "3️⃣ minutlik") {
            users = await db.controllers.users.getMany({
                createdAt: { // 3 minutes ago (from now)
                    $gte: new Date(new Date().getTime() - (1000 * 60 * 3))
                }
            });
        }
        const data = await excel.generateDb({
            users,
        });

        ctx.replyWithDocument({ source: data, filename: "baza.xlsx" });
        ctx.scene.enter("start");
    }
);

module.exports = scene;