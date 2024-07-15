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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fs_1 = require("fs");
dotenv.config();
var fileUtils;
(function (fileUtils) {
    const savePath = process.env.SAVE_PATH;
    if (!(0, fs_1.existsSync)(savePath))
        (0, fs_1.mkdirSync)(savePath);
    fileUtils.saveFile = (name, data) => {
        (0, fs_1.writeFileSync)(savePath + "/" + name, data);
        return savePath + "/" + name;
    };
    fileUtils.removeFile = (name) => {
        (0, fs_1.rmSync)(savePath + "/" + name, { recursive: true, force: true });
        return savePath + "/" + name;
    };
})(fileUtils || (fileUtils = {}));
exports.default = fileUtils;
