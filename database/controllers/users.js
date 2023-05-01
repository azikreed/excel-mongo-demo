const { User } = require("../models");

const getMany = async (conditions = {}) => {
    return await User.find(conditions);
}

module.exports = {
    getMany
}