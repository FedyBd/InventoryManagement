"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const stock_entity_1 = require("../../stock/entities/stock.entity");
const request_entity_1 = require("../../request/entities/request.entity");
const demand_entity_1 = require("../../demands/entities/demand.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Office', 'Store'] }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "magasinId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_entity_1.Stock, (stock) => stock.user),
    __metadata("design:type", Array)
], User.prototype, "stocks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.user),
    __metadata("design:type", Array)
], User.prototype, "requestsAsUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.magazine),
    __metadata("design:type", Array)
], User.prototype, "requestsAsMagazine", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demand_entity_1.Demand, demand => demand.user),
    __metadata("design:type", Array)
], User.prototype, "demandsasUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demand_entity_1.Demand, demand => demand.user),
    __metadata("design:type", Array)
], User.prototype, "demandsasMag", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map