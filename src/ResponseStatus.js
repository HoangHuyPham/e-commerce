"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "Success";
    ResponseStatus["FAILED"] = "Failed";
    ResponseStatus["INVALID"] = "Invalid";
    ResponseStatus["UNAUTHORIZED"] = "Unauthorized";
    ResponseStatus["AUTHORIZED"] = "Authorized";
    ResponseStatus["EXPIRED_TOKEN"] = "Expired Token";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
