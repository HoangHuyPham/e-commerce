"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../models/Account");
var userService;
(function (userService) {
    userService.signUp = (account) => {
        return Account_1.Account.create(account);
    };
    userService.login = (userName, password) => {
        return Account_1.Account.findOne({ where: {
                userName, password
            } });
    };
    userService.getAccountInfo = (userName) => {
        return Account_1.Account.findOne({ where: {
                userName
            } });
    };
    userService.updateAccountById = (id, newAttr) => {
        return Account_1.Account.update(newAttr, { where: { id } });
    };
    userService.changePassword = (userName, oldPassword, newPassword) => {
        return Account_1.Account.update({ password: newPassword }, { where: { userName, password: oldPassword } });
    };
})(userService || (userService = {}));
exports.default = userService;
