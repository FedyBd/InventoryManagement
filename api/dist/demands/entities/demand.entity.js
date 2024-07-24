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
exports.Demand = exports.DemandStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const stock_entity_1 = require("../../stock/entities/stock.entity");
var DemandStatus;
(function (DemandStatus) {
    DemandStatus["NOT_CHECKED"] = "NOT CHECKED";
    DemandStatus["CHECKING"] = "CHECKING";
    DemandStatus["APPROVED"] = "APPROVED";
    DemandStatus["REFUSED"] = "REFUSED";
})(DemandStatus || (exports.DemandStatus = DemandStatus = {}));
let Demand = class Demand {
};
exports.Demand = Demand;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Demand.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_entity_1.Stock, stock => stock.demands, { eager: true }),
    __metadata("design:type", stock_entity_1.Stock)
], Demand.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Demand.prototype, "stockId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.demandsasUser, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Demand.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Demand.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Demand.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, magazine => magazine.demandsasMag, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Demand.prototype, "magazine", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Demand.prototype, "magazineId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Demand.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DemandStatus,
        default: DemandStatus.NOT_CHECKED,
    }),
    __metadata("design:type", String)
], Demand.prototype, "status", void 0);
exports.Demand = Demand = __decorate([
    (0, typeorm_1.Entity)('demands')
], Demand);
//# sourceMappingURL=demand.entity.js.map