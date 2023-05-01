const ExcelJS = require('exceljs');
const db = require('../database');
const { User } = require('../database/models');
const { Stream } = require('stream');


exports.generateDb = async ({
    users
}) => {
    const workbook = new ExcelJS.Workbook();

    const usersSheet = workbook.addWorksheet('Foydalanuvchilar');
    usersSheet.columns = [
        { header: "T/r", key: "number", width: 5 },
        { header: "Ism", key: "name", width: 15 },
        { header: "Familiya", key: "surname", width: 20 }
    ];

    users.forEach((user, index) => {
        user.number = index + 1;
        user.name = user.name;
        user.surname = user.surname;
        usersSheet.addRow(user);
    });
    usersSheet.getRow(1).eachCell(cell => cell.font = { bold: true });

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

        console.log(users);

        await User.deleteMany({});
        await User.insertMany(users);

        cb(true);
    })
}