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
exports.MurmursService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const murmur_entity_1 = require("./entities/murmur.entity");
const like_entity_1 = require("./entities/like.entity");
let MurmursService = class MurmursService {
    constructor(murmursRepository, likesRepository) {
        this.murmursRepository = murmursRepository;
        this.likesRepository = likesRepository;
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [murmurs, total] = await this.murmursRepository.findAndCount({
            relations: ['user'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return {
            data: murmurs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const murmur = await this.murmursRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!murmur) {
            throw new common_1.NotFoundException(`Murmur with ID ${id} not found`);
        }
        return murmur;
    }
    async create(userId, createMurmurDto) {
        const murmur = this.murmursRepository.create({
            userId,
            ...createMurmurDto,
        });
        return this.murmursRepository.save(murmur);
    }
    async remove(userId, id) {
        const murmur = await this.murmursRepository.findOne({ where: { id } });
        if (!murmur) {
            throw new common_1.NotFoundException(`Murmur with ID ${id} not found`);
        }
        if (murmur.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own murmurs');
        }
        await this.murmursRepository.remove(murmur);
        return { message: 'Murmur deleted successfully' };
    }
    async like(userId, murmurId) {
        const murmur = await this.murmursRepository.findOne({ where: { id: murmurId } });
        if (!murmur) {
            throw new common_1.NotFoundException(`Murmur with ID ${murmurId} not found`);
        }
        const existingLike = await this.likesRepository.findOne({
            where: { userId, murmurId },
        });
        if (existingLike) {
            return { message: 'Already liked' };
        }
        const like = this.likesRepository.create({ userId, murmurId });
        await this.likesRepository.save(like);
        murmur.likeCount += 1;
        await this.murmursRepository.save(murmur);
        return { message: 'Liked successfully', likeCount: murmur.likeCount };
    }
    async unlike(userId, murmurId) {
        const like = await this.likesRepository.findOne({
            where: { userId, murmurId },
        });
        if (!like) {
            throw new common_1.NotFoundException('Like not found');
        }
        await this.likesRepository.remove(like);
        const murmur = await this.murmursRepository.findOne({ where: { id: murmurId } });
        if (murmur && murmur.likeCount > 0) {
            murmur.likeCount -= 1;
            await this.murmursRepository.save(murmur);
        }
        return { message: 'Unliked successfully', likeCount: murmur?.likeCount || 0 };
    }
    async getTimeline(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const query = this.murmursRepository
            .createQueryBuilder('murmur')
            .leftJoinAndSelect('murmur.user', 'user')
            .leftJoin('follows', 'follow', 'follow.following_id = murmur.user_id')
            .where('follow.follower_id = :userId', { userId })
            .orWhere('murmur.user_id = :userId', { userId })
            .orderBy('murmur.created_at', 'DESC')
            .skip(skip)
            .take(limit);
        const [murmurs, total] = await query.getManyAndCount();
        return {
            data: murmurs,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.MurmursService = MurmursService;
exports.MurmursService = MurmursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(1, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MurmursService);
//# sourceMappingURL=murmurs.service.js.map