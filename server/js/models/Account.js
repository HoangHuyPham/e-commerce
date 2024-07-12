"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
class Account extends core_1.Model {
}
exports.Account = Account;
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER),
    decorators_legacy_1.PrimaryKey,
    decorators_legacy_1.AutoIncrement,
    decorators_legacy_1.NotNull
], Account.prototype, "id", void 0);
__decorate([
    decorators_legacy_1.PrimaryKey,
    decorators_legacy_1.Unique,
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "userName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "password", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "firstName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "lastName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "email", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "address", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER)
], Account.prototype, "phoneNumber", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Account.prototype, "avatarLink", void 0);
__decorate([
    (0, decorators_legacy_1.Default)(false),
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.BOOLEAN)
], Account.prototype, "isAdmin", void 0);
