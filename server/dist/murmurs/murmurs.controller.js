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
exports.MurmursController = void 0;
const common_1 = require("@nestjs/common");
const create_murmur_dto_1 = require("./dto/create-murmur.dto");
const murmurs_service_1 = require("./murmurs.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MurmursController = class MurmursController {
    constructor(murmursService) {
        this.murmursService = murmursService;
    }
    async findAll(page = 1, limit = 10) {
        return this.murmursService.findAll(page, limit);
    }
    async findOne(id) {
        return this.murmursService.findOne(+id);
    }
    async create(req, createMurmurDto) {
        return this.murmursService.create(req.user.id, createMurmurDto);
    }
    async remove(req, id) {
        return this.murmursService.remove(req.user.id, +id);
    }
    async like(req, id) {
        return this.murmursService.like(req.user.id, +id);
    }
    async unlike(req, id) {
        return this.murmursService.unlike(req.user.id, +id);
    }
    async getTimeline(req, page = 1, limit = 10) {
        return this.murmursService.getTimeline(req.user.id, page, limit);
    }
};
exports.MurmursController = MurmursController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('me/murmurs'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_murmur_dto_1.CreateMurmurDto]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('me/murmurs/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "like", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id/like'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "unlike", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('timeline/me'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "getTimeline", null);
exports.MurmursController = MurmursController = __decorate([
    (0, common_1.Controller)('murmurs'),
    __metadata("design:paramtypes", [murmurs_service_1.MurmursService])
], MurmursController);
//# sourceMappingURL=murmurs.controller.js.map