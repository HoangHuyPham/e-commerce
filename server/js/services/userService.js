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
})(userService || (userService = {}));
exports.default = userService;
