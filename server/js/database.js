"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const mysql2_1 = __importDefault(require("mysql2"));
const dbConfig = loadConfig();
const connection = mysql2_1.default.createPool(dbConfig).promise();
var db;
(function (db) {
    function getWatchById(id) {
        return connection.query(`SELECT * FROM images WHERE watch_id=?`, [
            id
        ]);
    }
    db.getWatchById = getWatchById;
    function getWatchByName(name) {
        return connection.query(`SELECT * FROM images WHERE name=?`, [
            name
        ]);
    }
    db.getWatchByName = getWatchByName;
    function addWatch(watch) {
        return connection.query(`INSERT INTO accounts (name,	detail,	price, preview)
            VALUES (?, ?, ?, ?)`, [
            watch.name,
            watch.detail,
            watch.price,
            watch.previewLink
        ]);
    }
    db.addWatch = addWatch;
    function removePicture(id) {
        return connection.query(`DELETE FROM accounts WHERE id=?`, [
            id
        ]);
    }
    db.removePicture = removePicture;
    function getPicture(id) {
        return connection.query(`SELECT * FROM images WHERE image_id=?`, [
            id
        ]);
    }
    db.getPicture = getPicture;
    function addPicture(picture) {
        return connection.query(`INSERT INTO images (image_link) VALUES (?)`, [
            picture.imageLink,
        ]);
    }
    db.addPicture = addPicture;
    function removeAccount(username) {
        return connection.query(`DELETE FROM accounts WHERE username=?`, [
            username
        ]);
    }
    db.removeAccount = removeAccount;
    function getAccountInfo(username) {
        return connection.query(`SELECT * FROM accounts WHERE username=?`, [
            username
        ]);
    }
    db.getAccountInfo = getAccountInfo;
    function getAccount(username, password) {
        return connection.query(`SELECT * FROM accounts WHERE username=? AND password=?`, [
            username,
            password
        ]);
    }
    db.getAccount = getAccount;
    function addAccount(account) {
        return connection.query(`INSERT INTO accounts (username, password, firstname, lastname, email, address, phone_number, balance, avatar, is_admin)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            account.username,
            account.password,
            account.firstname,
            account.lastname,
            account.email,
            account.address,
            account.phoneNumber,
            account.balance,
            account.avatar,
            account.isAdmin
        ]);
    }
    db.addAccount = addAccount;
})(db || (db = {}));
function loadConfig() {
    return {
        host: config_1.default.db.HOST,
        user: config_1.default.db.USER,
        password: config_1.default.db.PASSWORD,
        port: config_1.default.db.PORT,
        database: config_1.default.db.DATABASE_NAME,
        connectionLimit: config_1.default.db.CONNECTIONLIMIT,
        waitForConnections: config_1.default.db.WAITFORCONNECTIONS === 1 ? true : false
    };
}
exports.default = db;
