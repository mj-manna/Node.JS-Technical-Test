import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
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
        murmurs: import("../murmurs/entities/murmur.entity").Murmur[];
        likes: import("../murmurs/entities/like.entity").Like[];
        followers: import("./entities/user.entity").User[];
        following: import("./entities/user.entity").User[];
    }>;
    findOne(id: string): Promise<{
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
        murmurs: import("../murmurs/entities/murmur.entity").Murmur[];
        likes: import("../murmurs/entities/like.entity").Like[];
        followers: import("./entities/user.entity").User[];
        following: import("./entities/user.entity").User[];
    }>;
    getUserMurmurs(id: string): Promise<import("../murmurs/entities/murmur.entity").Murmur[]>;
    follow(req: any, id: string): Promise<{
        message: string;
    }>;
    unfollow(req: any, id: string): Promise<{
        message: string;
    }>;
    getFollowers(id: string): Promise<import("./entities/user.entity").User[]>;
    getFollowing(id: string): Promise<import("./entities/user.entity").User[]>;
}
