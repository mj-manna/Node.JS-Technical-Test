import { Murmur } from '../../murmurs/entities/murmur.entity';
import { Like } from '../../murmurs/entities/like.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    murmurs: Murmur[];
    likes: Like[];
    followers: User[];
    following: User[];
}
