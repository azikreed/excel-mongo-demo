const { Scenes, Markup } = require("telegraf");
const { updateDb } = require("../../utils/excel");
const axios = require('axios').default;

const scene = new Scenes.WizardScene(
    'excel:save',
    (ctx) => {
        let text = "📁 Excel file yuboring";
        let keyboard = Markup.keyboard([
            ["◀️ Orqaga"]
        ]);
        ctx.reply(text, keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        let file = ctx.message?.document;
        console.log(file);
        if (!file) return ctx.scene.reenter();
        const { href: link } = await ctx.telegram.getFileLink(file.file_id);
        const { data } = await axios.get(link, { responseType: 'arraybuffer' });
        await updateDb(data, success => {
            if (!success) {
                let text = "⚠️ Xatolik yuz berdi";
                ctx.reply(text);
                ctx.scene.enter('start');
                return
            }
            let text = "✅ Muvaffaqiyatli yangilandi";
            ctx.reply(text);
            ctx.scene.enter('start');
        });
    }
);

scene.hears("◀️ Orqaga", ctx => ctx.scene.enter('start'));

module.exports = scene;