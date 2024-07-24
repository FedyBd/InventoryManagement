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
exports.DemandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demand_entity_1 = require("./entities/demand.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const stock_entity_1 = require("../stock/entities/stock.entity");
let DemandsService = class DemandsService {
    constructor(demandRepository, userRepository, stockRepository) {
        this.demandRepository = demandRepository;
        this.userRepository = userRepository;
        this.stockRepository = stockRepository;
    }
    async create(stockId, userId, quantity, magazineId) {
        const stock = await this.stockRepository.findOne({ where: { id: stockId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const magazine = await this.userRepository.findOne({ where: { id: magazineId } });
        const newDemand = this.demandRepository.create({
            stock,
            user,
            quantity,
            magazine,
            status: demand_entity_1.DemandStatus.NOT_CHECKED,
        });
        return this.demandRepository.save(newDemand);
    }
    findAll(id) {
        return this.demandRepository.find({ where: { userId: id } });
    }
    findAllMag(id) {
        return this.demandRepository.find({ where: { magazineId: id } });
    }
    async update(id, status) {
        const demand = await this.demandRepository.findOne({ where: { id: id } });
        if (!demand) {
            throw new common_1.UnauthorizedException('Demand does not exists');
        }
        await this.demandRepository.update({ id }, { status: status });
        console.log('hhhh');
        return this.demandRepository.findOne({ where: { id } });
    }
    findOne(id) {
        return `This action returns a #${id} demand`;
    }
    remove(id) {
        return `This action removes a #${id} demand`;
    }
};
exports.DemandsService = DemandsService;
exports.DemandsService = DemandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demand_entity_1.Demand)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DemandsService);
//# sourceMappingURL=demands.service.js.map