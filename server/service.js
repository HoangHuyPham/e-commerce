"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service;
(function (service) {
    var Account = /** @class */ (function () {
        // eslint-disable-next-line @typescript-eslint/no-useless-constructor
        function Account(username, password, balance, firstname, lastname, email, address, phoneNumber, avatar) {
        }
        return Account;
    }());
    service.Account = Account;
    service.signUp = function (account) {
        return false;
    };
})(service || (service = {}));
exports.default = service;
