"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
var service;
(function (service) {
    service.signUp = (account) => {
        return database_1.default.addAccount(account).then(e => {
            return true;
        }).catch(err => {
            return false;
        });
    };
    service.getAccountInfo = (username) => {
        return database_1.default.getAccountInfo(username).then(e => {
            let account;
            if (e && e[0].length > 0) {
                account = Object.assign({}, e[0][0]);
                return account;
            }
            else {
                return undefined;
            }
        }).catch(err => {
            console.log(err);
            return undefined;
        });
    };
    service.login = (username, password) => {
        console.log(username, password);
        return database_1.default.getAccount(username, password).then(e => {
            if (e && e[0].length > 0) {
                console.log("ok");
                return service.getAccountInfo(username);
            }
            else {
                return false;
            }
        }).catch(err => {
            console.log(err);
            return false;
        });
    };
})(service || (service = {}));
exports.default = service;
