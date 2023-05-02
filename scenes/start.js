const { Scenes, Markup } = require("telegraf");

const scene = new Scenes.BaseScene('start');

scene.enter((ctx) => {
    let text = "👇 Quyidagilardan birini tanlang";
    let keyboard = Markup.keyboard([
        ["📁 Excel file yuborish"],
        ["📂 Excel file'ni olish"],
        ["🧍‍♂️ Foydalanuvchi qo'shish"],
    ]).resize();
    ctx.reply(text, keyboard);
});

scene.hears("📁 Excel file yuborish", ctx => ctx.scene.enter('excel:save'));
scene.hears("📂 Excel file'ni olish", ctx => ctx.scene.enter('excel:send'));
scene.hears("🧍‍♂️ Foydalanuvchi qo'shish", ctx => ctx.scene.enter('user:add'));

module.exports = scene;