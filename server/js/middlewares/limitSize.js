"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitSize = void 0;
const ResponseStatus_1 = require("../const/ResponseStatus");
const limitSize = (req, resp, next) => {
    if (req.file) {
        // Limit file size 2mb
        if (req.file.size > (1024 * 1024 * 2)) {
            resp.json({ status: ResponseStatus_1.ResponseStatus.MAX_LIMIT, data: {} });
            return;
        }
        else {
            next();
        }
    }
};
exports.limitSize = limitSize;
