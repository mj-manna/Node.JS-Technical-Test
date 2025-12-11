import { User } from './user.entity';
export declare class Follow {
    id: number;
    followerId: number;
    followingId: number;
    createdAt: Date;
    follower: User;
    following: User;
}
