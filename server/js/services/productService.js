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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const Image_1 = require("../models/Image");
const Watch_1 = require("../models/Watch");
dotenv.config();
var productService;
(function (productService) {
    const LIMIT = 10;
    productService.getPagination = () => __awaiter(this, void 0, void 0, function* () {
        let min = -1;
        let max = -1;
        yield Watch_1.Watch.findAll().then(e => {
            min = 0;
            max = Math.ceil(e.length / LIMIT) - 1;
        });
        return new Promise(resolve => resolve({ min, max, size: LIMIT }));
    });
    productService.getAllProducts = (offset = 0, limit = LIMIT) => {
        return Watch_1.Watch.findAll({
            include: [
                {
                    model: Image_1.Image,
                    as: 'preview',
                    attributes: ['url'],
                },
            ],
            offset,
            limit
        });
    };
    productService.getProductById = (id) => {
        return Watch_1.Watch.findOne({
            where: { id }
        });
    };
    productService.updateProductById = (id, newAttr) => {
        return Watch_1.Watch.update(newAttr, { where: { id } });
    };
    productService.addProduct = (watch) => {
        return Watch_1.Watch.create(watch);
    };
})(productService || (productService = {}));
exports.default = productService;
