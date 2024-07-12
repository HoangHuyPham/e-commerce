"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = void 0;
const ResponseStatus_1 = require("../const/ResponseStatus");
const userService_1 = __importDefault(require("../services/userService"));
const signUpController = (req, resp) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let userName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userName;
    let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    let firstName = (_c = req.body) === null || _c === void 0 ? void 0 : _c.firstName;
    let lastName = (_d = req.body) === null || _d === void 0 ? void 0 : _d.lastName;
    let email = (_e = req.body) === null || _e === void 0 ? void 0 : _e.email;
    let address = (_f = req.body) === null || _f === void 0 ? void 0 : _f.address;
    let phoneNumber = (_g = req.body) === null || _g === void 0 ? void 0 : _g.phoneNumber;
    let avatarLink = (_h = req.body) === null || _h === void 0 ? void 0 : _h.avatarLink;
    let isAdmin = (_j = req.body) === null || _j === void 0 ? void 0 : _j.isAdmin;
    userService_1.default.signUp({ userName, password, firstName, lastName, email, address, phoneNumber, avatarLink, isAdmin }).then(() => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: "Created" });
    }).catch(err => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: "Account may be exist" });
    });
};
exports.signUpController = signUpController;
