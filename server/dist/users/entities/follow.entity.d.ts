import { User } from './user.entity';
export declare class Follow {
    followerId: number;
    followingId: number;
    createdAt: Date;
    follower: User;
    following: User;
}
