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
exports.uploadPreview = exports.uploadAvatar = void 0;
const crypto_1 = require("crypto");
const dotenv = __importStar(require("dotenv"));
const ResponseStatus_1 = require("../const/ResponseStatus");
const imageService_1 = __importDefault(require("../services/imageService"));
const productService_1 = __importDefault(require("../services/productService"));
const userService_1 = __importDefault(require("../services/userService"));
dotenv.config();
const uploadAvatar = (req, resp) => {
    var _a, _b, _c, _d;
    const user = req.user;
    var url = undefined;
    var id = undefined;
    if (!user) {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
    }
    if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname.endsWith(".png")) {
        imageService_1.default.upload((0, crypto_1.randomUUID)() + ".png", (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer)
            .then(e => userService_1.default.updateAccountById(user.id, { avatarId: e.id }))
            .then(e => resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: {} }))
            .catch(err => {
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
    else if ((_c = req.file) === null || _c === void 0 ? void 0 : _c.originalname.endsWith(".jpg")) {
        imageService_1.default.upload((0, crypto_1.randomUUID)() + ".jpg", (_d = req.file) === null || _d === void 0 ? void 0 : _d.buffer)
            .then(e => {
            url = e.url;
            id = e.id;
            userService_1.default.updateAccountById(user.id, { avatarId: e.id });
        })
            .then(e => resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: { url, id } }))
            .catch(err => {
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
};
exports.uploadAvatar = uploadAvatar;
const uploadPreview = (req, resp) => {
    var _a, _b, _c, _d, _e;
    const user = req.user;
    var url = undefined;
    var id = undefined;
    var productId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!user || !productId) {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
    }
    if ((_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname.endsWith(".png")) {
        imageService_1.default.upload((0, crypto_1.randomUUID)() + ".png", (_c = req.file) === null || _c === void 0 ? void 0 : _c.buffer)
            .then(e => {
            url = e.url;
            id = e.id;
            productService_1.default.updateProductById(productId, { previewId: e.id });
        })
            .then(e => resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: { url, id } }))
            .catch(err => {
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
    else if ((_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname.endsWith(".jpg")) {
        imageService_1.default.upload((0, crypto_1.randomUUID)() + ".png", (_e = req.file) === null || _e === void 0 ? void 0 : _e.buffer)
            .then(e => {
            url = e.url;
            id = e.id;
            productService_1.default.updateProductById(productId, { previewId: e.id });
        })
            .then(e => resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: { url, id } }))
            .catch(err => {
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
};
exports.uploadPreview = uploadPreview;
