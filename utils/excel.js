const ExcelJS = require('exceljs');
const db = require('../database');
const { User } = require('../database/models');
const { Stream } = require('stream');


exports.generateDb = async ({
    users,
    settings
}) => {
    const workbook = new ExcelJS.Workbook();

    function checkAndCreateWorkSheet(name) {
        let workSheet = workbook.getWorksheet(name) ? workbook.getWorksheet(name) : workbook.addWorksheet(name);
        workSheet.columns = [
            { header: "T/r", key: "number", width: 5 },
            { header: "Ism", key: "name", width: 15 },
            { header: "Familiya", key: "surname", width: 20 }
        ];
        workSheet.getRow(1).eachCell(cell => cell.font = { bold: true });
        return workSheet ? workSheet : null;
    }

    users.forEach((user, index) => {
        let workSheet = checkAndCreateWorkSheet(`${user.createdAt.getHours()}-${user.createdAt.getMinutes()}`);
        user.number = index + 1;
        user.name = user.name;
        user.surname = user.surname;
        workSheet.addRow(user);
    });

    return await workbook.xlsx.writeBuffer();
}



exports.updateDb = async (data, cb) => {
    let workbook = new ExcelJS.Workbook();
    const stream = new Stream.Readable();
    stream.push(data);
    stream.push(null);
    workbook.xlsx.read(stream).then(async workbook => {
        const usersSheet = workbook.getWorksheet('Foydalanuvchilar');

        if (!usersSheet) {
            return cb(false);
        }

        let users = [];

        usersSheet.eachRow(row => {
            if (row.number > 1) {
                users.push({
                    name: row.getCell(2),
                    surname: row.getCell(3)
                })
            }
        })


        await User.deleteMany({});
        const saved = await User.insertMany(users);
        // let date = saved[0].createdAt;
        // let dateInArray = date.split(":");
        // dateInArray[dateInArray.length - 1] = null;
        // console.log(dateInArray.join(":"));
        // console.log(`${date.getHours() > 9 ? date.getHours() : `0` + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0` + date.getMinutes()}`);
        cb(true);
    })
}