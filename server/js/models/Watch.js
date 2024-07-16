"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watch = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const Image_1 = require("./Image");
class Watch extends core_1.Model {
}
exports.Watch = Watch;
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER),
    decorators_legacy_1.PrimaryKey,
    decorators_legacy_1.AutoIncrement,
    decorators_legacy_1.NotNull
], Watch.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Watch.prototype, "name", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.STRING)
], Watch.prototype, "detail", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.DOUBLE)
], Watch.prototype, "price", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER)
], Watch.prototype, "category", void 0);
__decorate([
    (0, decorators_legacy_1.BelongsTo)(() => Image_1.Image, 'previewId')
], Watch.prototype, "preview", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)(core_1.DataTypes.INTEGER)
], Watch.prototype, "previewId", void 0);
