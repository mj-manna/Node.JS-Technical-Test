import { Repository } from 'typeorm';
import { Murmur } from './entities/murmur.entity';
import { Like } from './entities/like.entity';
import { Follow } from '../users/entities/follow.entity';
import { CreateMurmurDto } from './dto/create-murmur.dto';
export declare class MurmursService {
    private murmursRepository;
    private likesRepository;
    private followsRepository;
    constructor(murmursRepository: Repository<Murmur>, likesRepository: Repository<Like>, followsRepository: Repository<Follow>);
    findAll(page?: number, limit?: number): Promise<{
        data: Murmur[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Murmur>;
    create(userId: number, createMurmurDto: CreateMurmurDto): Promise<Murmur>;
    remove(userId: number, id: number): Promise<{
        message: string;
    }>;
    like(userId: number, murmurId: number): Promise<{
        message: string;
        likeCount?: undefined;
    } | {
        message: string;
        likeCount: number;
    }>;
    unlike(userId: number, murmurId: number): Promise<{
        message: string;
        likeCount: number;
    }>;
    getTimeline(userId: number, page?: number, limit?: number): Promise<{
        data: Murmur[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
