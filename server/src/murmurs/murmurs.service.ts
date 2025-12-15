import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Murmur } from './entities/murmur.entity';
import { Like } from './entities/like.entity';
import { Follow } from '../users/entities/follow.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private murmursRepository: Repository<Murmur>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
  ) { }

  async findAll(page: number = 1, limit: number = 10) {
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

  async findOne(id: number) {
    const murmur = await this.murmursRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!murmur) {
      throw new NotFoundException(`Murmur with ID ${id} not found`);
    }

    return murmur;
  }

  async create(userId: number, createMurmurDto: CreateMurmurDto) {
    const murmur = this.murmursRepository.create({
      userId,
      ...createMurmurDto,
    });

    return this.murmursRepository.save(murmur);
  }

  async remove(userId: number, id: number) {
    const murmur = await this.murmursRepository.findOne({ where: { id } });

    if (!murmur) {
      throw new NotFoundException(`Murmur with ID ${id} not found`);
    }

    if (murmur.userId !== userId) {
      throw new ForbiddenException('You can only delete your own murmurs');
    }

    await this.murmursRepository.remove(murmur);
    return { message: 'Murmur deleted successfully' };
  }

  async like(userId: number, murmurId: number) {
    const murmur = await this.murmursRepository.findOne({ where: { id: murmurId } });

    if (!murmur) {
      throw new NotFoundException(`Murmur with ID ${murmurId} not found`);
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

  async unlike(userId: number, murmurId: number) {
    const like = await this.likesRepository.findOne({
      where: { userId, murmurId },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likesRepository.remove(like);

    const murmur = await this.murmursRepository.findOne({ where: { id: murmurId } });
    if (murmur && murmur.likeCount > 0) {
      murmur.likeCount -= 1;
      await this.murmursRepository.save(murmur);
    }

    return { message: 'Unliked successfully', likeCount: murmur?.likeCount || 0 };
  }

  async getTimeline(userId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    // Get the list of users being followed
    const follows = await this.followsRepository.find({
      where: { followerId: userId },
      select: ['followingId'],
    });

    const followingIds = follows.map(f => f.followingId);

    // Include the user's own ID to show their own murmurs
    const userIds = [...followingIds, userId];

    const [murmurs, total] = await this.murmursRepository.findAndCount({
      where: { userId: In(userIds) },
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
}