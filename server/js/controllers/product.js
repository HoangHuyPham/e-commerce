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
exports.productGetSearch = exports.deleteProductPost = exports.updateProductPost = exports.addProductPost = exports.productGet = exports.productGetPagination = void 0;
const core_1 = require("@sequelize/core");
const dotenv = __importStar(require("dotenv"));
const ResponseStatus_1 = require("../const/ResponseStatus");
const productService_1 = __importDefault(require("../services/productService"));
dotenv.config();
const productGetPagination = (req, resp) => {
    var _a, _b;
    let category = (_a = req.query) === null || _a === void 0 ? void 0 : _a.category;
    let keyword = (_b = req.query) === null || _b === void 0 ? void 0 : _b.keyword;
    if (category && keyword) {
        productService_1.default.getPagination(keyword, Number(category)).then((e) => {
            if (e) {
                resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: e });
            }
            else {
                // Failed
                resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
            }
            return;
        }).catch(err => {
            // Error
            console.log(err);
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
    else {
        productService_1.default.getPagination().then((e) => {
            if (e) {
                resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: e });
            }
            else {
                // Failed
                resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
            }
            return;
        }).catch(err => {
            // Error
            console.log(err);
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        });
    }
};
exports.productGetPagination = productGetPagination;
const productGet = (req, resp) => {
    const page = Number(req.params.page);
    const limit = 10; // return 10 product
    const offset = page * limit;
    if (isNaN(page)) {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        return;
    }
    productService_1.default.getAllProducts(offset, limit).then((e) => {
        if (e) {
            resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: e });
        }
        else {
            // Failed
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        }
        return;
    }).catch(err => {
        // Error
        console.log(err);
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
    });
};
exports.productGet = productGet;
const addProductPost = (req, resp) => {
    let newProduct = req === null || req === void 0 ? void 0 : req.body;
    productService_1.default.addProduct(newProduct).then(e => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: {} });
    }).catch(err => {
        if (err instanceof core_1.UniqueConstraintError) {
            resp.json({ status: ResponseStatus_1.ResponseStatus.UNIQUE_KEY, data: {} });
        }
        else {
            resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        }
    });
};
exports.addProductPost = addProductPost;
const updateProductPost = (req, resp) => {
    let newProduct = req === null || req === void 0 ? void 0 : req.body;
    let id = newProduct === null || newProduct === void 0 ? void 0 : newProduct.id;
    if (!id) {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        return;
    }
    productService_1.default.updateProductById(id, newProduct).then(e => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: {} });
    }).catch(err => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
    });
};
exports.updateProductPost = updateProductPost;
const deleteProductPost = (req, resp) => {
    var _a;
    let id = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id;
    if (!id) {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
        return;
    }
    productService_1.default.deleteProductById(id).then(e => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: {} });
    }).catch(err => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: {} });
    });
};
exports.deleteProductPost = deleteProductPost;
const productGetSearch = (req, resp) => {
    var _a, _b;
    let keyword = (_a = req.query) === null || _a === void 0 ? void 0 : _a.keyword;
    let category = (_b = req.query) === null || _b === void 0 ? void 0 : _b.category;
    productService_1.default.getAllProductsByOp(keyword, Number(category)).then(e => {
        resp.json({ status: ResponseStatus_1.ResponseStatus.SUCCESS, data: e });
    }).catch(err => {
        console.log(err);
        resp.json({ status: ResponseStatus_1.ResponseStatus.FAILED, data: err });
    });
};
exports.productGetSearch = productGetSearch;
