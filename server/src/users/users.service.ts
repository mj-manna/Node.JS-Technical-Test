import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Murmur } from '../murmurs/entities/murmur.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
    @InjectRepository(Murmur)
    private murmursRepository: Repository<Murmur>,
  ) { }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
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

  async getUserMurmurs(userId: number) {
    return this.murmursRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async follow(followerId: number, followingId: number) {
    if (followerId === followingId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const user = await this.usersRepository.findOne({ where: { id: followingId } });
    if (!user) {
      throw new NotFoundException('User not found');
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

  async unfollow(followerId: number, followingId: number) {
    const follow = await this.followsRepository.findOne({
      where: { followerId, followingId },
    });

    if (!follow) {
      throw new NotFoundException('Follow relationship not found');
    }

    await this.followsRepository.remove(follow);
    return { message: 'Unfollowed successfully' };
  }

  async getFollowers(userId: number) {
    const follows = await this.followsRepository.find({
      where: { followingId: userId },
      relations: ['follower'],
    });

    return follows.map(f => f.follower);
  }

  async getFollowing(userId: number) {
    const follows = await this.followsRepository.find({
      where: { followerId: userId },
      relations: ['following'],
    });

    return follows.map(f => f.following);
  }
}