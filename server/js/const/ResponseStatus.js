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
    ResponseStatus["UNAUTHENTICATE"] = "Unauthenticate";
    ResponseStatus["EXPIRED_TOKEN"] = "Expired Token";
    ResponseStatus["MAX_LIMIT"] = "File size is exceeed";
    ResponseStatus["UNIQUE_KEY"] = "ID is exist";
})(ResponseStatus || (exports.ResponseStatus = ResponseStatus = {}));
