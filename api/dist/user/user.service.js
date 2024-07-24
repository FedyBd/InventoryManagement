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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const { email, password, phone, name, magasinId, type } = createUserDto;
        const userExists = await this.repo.findOne({ where: { email } });
        if (userExists) {
            throw new common_1.ConflictException('user already exists');
        }
        const user = new user_entity_1.User();
        user.email = email;
        user.phone = phone;
        user.name = name;
        user.password = await bcrypt.hash(password, 12);
        user.magasinId = magasinId;
        user.type = type;
        this.repo.create(user);
        try {
            const saved = await this.repo.save(user);
            delete user.password;
            return saved;
        }
        catch {
            throw new common_1.InternalServerErrorException('something went wrong, User was not created. ');
        }
    }
    async getMagazins() {
        return this.repo.find({ where: { type: 'Store' } });
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async magname(id) {
        const mag = await this.repo.findOne({ where: { id: id } });
        const { name, ...result } = mag;
        return {
            "id": id,
            "name": name
        };
    }
    async modifyprofile(id, user, token) {
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const User = await this.repo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (User.id !== decodedToken.id) {
            throw new common_1.UnauthorizedException('You do not have permission to update this user profile');
        }
        await this.repo.update({ id }, { name: user.name, email: user.email, phone: user.phone });
        return this.repo.findOne({ where: { id } });
    }
    async getRelatedUsers(id, token) {
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const magazine = await this.repo.findOne({ where: { id } });
        if (!magazine) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (magazine.id !== decodedToken.id) {
            throw new common_1.UnauthorizedException('You do not have permission to get this magazine\'s users');
        }
        const relatedUsers = await this.repo.find({ where: { magasinId: decodedToken.id } });
        const sanitizedUsers = relatedUsers.map(user => {
            const { password, ...sanitizedUser } = user;
            return sanitizedUser;
        });
        return sanitizedUsers;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map