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
exports.Stock = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const request_entity_1 = require("../../request/entities/request.entity");
const demand_entity_1 = require("../../demands/entities/demand.entity");
let Stock = class Stock {
};
exports.Stock = Stock;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Stock.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Stock.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Stock.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.stocks),
    __metadata("design:type", user_entity_1.User)
], Stock.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stock.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.stock),
    __metadata("design:type", Array)
], Stock.prototype, "requests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demand_entity_1.Demand, demand => demand.stock),
    __metadata("design:type", Array)
], Stock.prototype, "demands", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)('stocks')
], Stock);
//# sourceMappingURL=stock.entity.js.map