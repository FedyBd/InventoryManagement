"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModule = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("./request.service");
const request_controller_1 = require("./request.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const stock_entity_1 = require("../stock/entities/stock.entity");
const request_entity_1 = require("./entities/request.entity");
const jwt_1 = require("@nestjs/jwt");
let RequestModule = class RequestModule {
};
exports.RequestModule = RequestModule;
exports.RequestModule = RequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([request_entity_1.Request, user_entity_1.User, stock_entity_1.Stock]),
            jwt_1.JwtModule.register({
                secret: 'osifnqjom@{#@~shejrphqzfezr',
                signOptions: { expiresIn: '10h' }
            })
        ],
        controllers: [request_controller_1.RequestController],
        providers: [request_service_1.RequestService],
    })
], RequestModule);
//# sourceMappingURL=request.module.js.map