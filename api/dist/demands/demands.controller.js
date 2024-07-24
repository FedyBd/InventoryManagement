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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandsController = void 0;
const common_1 = require("@nestjs/common");
const demands_service_1 = require("./demands.service");
const create_demand_dto_1 = require("./dto/create-demand.dto");
const update_demand_dto_1 = require("./dto/update-demand.dto");
let DemandsController = class DemandsController {
    constructor(demandsService) {
        this.demandsService = demandsService;
    }
    async create(createDemandDto) {
        const { stockId, userId, quantity, magazineId } = createDemandDto;
        return this.demandsService.create(stockId, userId, quantity, magazineId);
    }
    findAll(userId) {
        return this.demandsService.findAll(userId);
    }
    findAllMag(magId) {
        return this.demandsService.findAllMag(magId);
    }
    updateStatus(id, status) {
        return this.demandsService.update(id, status.status);
    }
    findOne(id) {
        return this.demandsService.findOne(+id);
    }
    remove(id) {
        return this.demandsService.remove(+id);
    }
};
exports.DemandsController = DemandsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demand_dto_1.CreateDemandDto]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('mag/:magId'),
    __param(0, (0, common_1.Param)('magId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DemandsController.prototype, "findAllMag", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_demand_dto_1.UpdateDemandStatusDto]),
    __metadata("design:returntype", void 0)
], DemandsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemandsController.prototype, "remove", null);
exports.DemandsController = DemandsController = __decorate([
    (0, common_1.Controller)('demands'),
    __metadata("design:paramtypes", [demands_service_1.DemandsService])
], DemandsController);
//# sourceMappingURL=demands.controller.js.map