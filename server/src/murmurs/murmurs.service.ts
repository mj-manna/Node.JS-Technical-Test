import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Murmur } from './entities/murmur.entity';
import { Like } from './entities/like.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur)
    private murmursRepository: Repository<Murmur>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
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
}