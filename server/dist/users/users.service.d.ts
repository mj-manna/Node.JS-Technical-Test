import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Follow } from './entities/follow.entity';
import { Murmur } from '../murmurs/entities/murmur.entity';
export declare class UsersService {
    private usersRepository;
    private followsRepository;
    private murmursRepository;
    constructor(usersRepository: Repository<User>, followsRepository: Repository<Follow>, murmursRepository: Repository<Murmur>);
    findOne(id: number): Promise<{
        followerCount: number;
        followingCount: number;
        id: number;
        username: string;
        email: string;
        displayName: string;
        bio: string;
        avatarUrl: string;
        createdAt: Date;
        updatedAt: Date;
        murmurs: Murmur[];
        likes: import("../murmurs/entities/like.entity").Like[];
        followers: User[];
        following: User[];
    }>;
    getUserMurmurs(userId: number): Promise<Murmur[]>;
    follow(followerId: number, followingId: number): Promise<{
        message: string;
    }>;
    unfollow(followerId: number, followingId: number): Promise<{
        message: string;
    }>;
    getFollowers(userId: number): Promise<User[]>;
    getFollowing(userId: number): Promise<User[]>;
}
