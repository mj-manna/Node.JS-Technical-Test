import { User } from '../../users/entities/user.entity';
import { Like } from './like.entity';
export declare class Murmur {
    id: number;
    userId: number;
    content: string;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    likes: Like[];
}
