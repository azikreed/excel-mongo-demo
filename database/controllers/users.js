const { User } = require("../models");

const create = async (data) => {
    const user = new User(data);
    return await user.save();
}

const getMany = async (conditions = {}) => {
    return await User.find(conditions);
}

module.exports = {
    create,
    getMany
}