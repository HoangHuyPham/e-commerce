"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const ResponseStatus_1 = require("../const/ResponseStatus");
const userService_1 = __importDefault(require("../services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const loginController = (req, resp) => {
    var _a, _b;
    let userName = (_a = req.body) === null || _a === void 0 ? void 0 : _a.userName;
    let password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    userService_1.default.login(userName, password).then((e) => {
        if (e) {
            let expireDate = new Date(new Date().getTime() + 60000 * 30); //30 min
            // Success
            let payload = {
                userName,
                isAdmin: e.isAdmin,
                firstName: e.firstName,
                lastName: e.lastName,
                iat: expireDate.getTime()
            };
            let token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: "HS256" });
            resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: { accessToken: token } });
        }
        else {
            // Failed
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        }
    }).catch(err => {
        // Error
        console.log(err);
        resp.json({ status: ResponseStatus_1.ResponseStatus.UNAUTHORIZED, data: {} });
    });
};
exports.loginController = loginController;
