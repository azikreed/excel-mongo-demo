const { Scenes } = require("telegraf");
const db = require("../../database");
const excel = require('../../utils/excel');

const scene = new Scenes.WizardScene('user:add',
    (ctx) => {
        let text = "🧍‍♂️ Foydalanuvchining ismini yuboring";

        ctx.reply(text);
        ctx.wizard.next();
    },
    (ctx) => {
        let name = ctx.message?.text;
        if (!name) {
            return ctx.scene.reenter();
        }

        ctx.wizard.state.name = name;

        let text = "🧍‍♂️ Foydalanuvchining familiyasini yuboring";

        ctx.reply(text);
        ctx.wizard.next();
    },
    async (ctx) => {
        let surname = ctx.message?.text;
        if (!surname) {
            return ctx.scene.reenter();
        }

        const { name } = ctx.wizard.state;

        let user = {
            name, surname
        };

        await db.controllers.users.create(user);

        let text = "✅ Foydalanuvchi muvaffaqiyatli qo'shildi!";
        ctx.reply(text);
        ctx.scene.enter("start");
    }
);

module.exports = scene;