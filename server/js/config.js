"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config;
(function (config) {
    let db;
    (function (db) {
        db["HOST"] = "localhost";
        db["USER"] = "root";
        db[db["PORT"] = 3306] = "PORT";
        db["PASSWORD"] = "";
        db["DATABASE_NAME"] = "ecommerce";
        db[db["WAITFORCONNECTIONS"] = 1] = "WAITFORCONNECTIONS";
        db[db["CONNECTIONLIMIT"] = 10] = "CONNECTIONLIMIT";
    })(db = config.db || (config.db = {}));
})(config || (config = {}));
exports.default = config;
