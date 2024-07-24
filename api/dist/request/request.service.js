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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_entity_1 = require("./entities/request.entity");
const user_entity_1 = require("../user/entities/user.entity");
const stock_entity_1 = require("../stock/entities/stock.entity");
const jwt_1 = require("@nestjs/jwt");
let RequestService = class RequestService {
    constructor(requestRepository, userRepository, stockRepository, jwtService) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.stockRepository = stockRepository;
        this.jwtService = jwtService;
    }
    async create(createRequestDto) {
        const request = new request_entity_1.Request();
        request.difference = createRequestDto.difference;
        request.user = await this.userRepository.findOne({ where: { id: createRequestDto.userId } });
        request.magazine = await this.userRepository.findOne({ where: { id: createRequestDto.magazineId } });
        request.stock = await this.stockRepository.findOne({ where: { id: createRequestDto.stockId } });
        return await this.requestRepository.save(request);
    }
    async findRequests(id, request, token) {
        const decodedToken = this.jwtService.decode(token);
        console.log(id != decodedToken.id);
        if (id != decodedToken.id) {
            console.log(`id: ${id}`);
            console.log(`decodedToken.id ${decodedToken.id}`);
            throw new common_1.UnauthorizedException('You do not have permission to visualize this modifications');
        }
        let user = await this.userRepository.findOne({ where: { id: id } });
        let requests = await this.requestRepository.find({
            where: { user: user },
            relations: ['user', 'stock', 'magazine']
        });
        return requests;
    }
    findAll() {
        return `This action returns all request`;
    }
    findOne(id) {
        return this.requestRepository.findOne({ where: { id } });
    }
    update(id, updateRequestDto) {
        return `This action updates a #${id} request`;
    }
    remove(id) {
        return `This action removes a #${id} request`;
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], RequestService);
//# sourceMappingURL=request.service.js.map