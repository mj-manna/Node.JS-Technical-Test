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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const follow_entity_1 = require("./entities/follow.entity");
const murmur_entity_1 = require("../murmurs/entities/murmur.entity");
let UsersService = class UsersService {
    constructor(usersRepository, followsRepository, murmursRepository) {
        this.usersRepository = usersRepository;
        this.followsRepository = followsRepository;
        this.murmursRepository = murmursRepository;
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const followerCount = await this.followsRepository.count({
            where: { followingId: id },
        });
        const followingCount = await this.followsRepository.count({
            where: { followerId: id },
        });
        const { passwordHash, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            followerCount,
            followingCount,
        };
    }
    async getUserMurmurs(userId) {
        return this.murmursRepository.find({
            where: { userId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async follow(followerId, followingId) {
        if (followerId === followingId) {
            throw new common_1.BadRequestException('You cannot follow yourself');
        }
        const user = await this.usersRepository.findOne({ where: { id: followingId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingFollow = await this.followsRepository.findOne({
            where: { followerId, followingId },
        });
        if (existingFollow) {
            return { message: 'Already following' };
        }
        const follow = this.followsRepository.create({ followerId, followingId });
        await this.followsRepository.save(follow);
        return { message: 'Followed successfully' };
    }
    async unfollow(followerId, followingId) {
        const follow = await this.followsRepository.findOne({
            where: { followerId, followingId },
        });
        if (!follow) {
            throw new common_1.NotFoundException('Follow relationship not found');
        }
        await this.followsRepository.remove(follow);
        return { message: 'Unfollowed successfully' };
    }
    async getFollowers(userId) {
        const follows = await this.followsRepository.find({
            where: { followingId: userId },
            relations: ['follower'],
        });
        return follows.map(f => f.follower);
    }
    async getFollowing(userId) {
        const follows = await this.followsRepository.find({
            where: { followerId: userId },
            relations: ['following'],
        });
        return follows.map(f => f.following);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __param(2, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map