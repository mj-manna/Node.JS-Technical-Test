import { CreateMurmurDto } from './dto/create-murmur.dto';
import { MurmursService } from './murmurs.service';
export declare class MurmursController {
    private readonly murmursService;
    constructor(murmursService: MurmursService);
    findAll(page?: number, limit?: number): Promise<{
        data: import("./entities/murmur.entity").Murmur[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/murmur.entity").Murmur>;
    create(req: any, createMurmurDto: CreateMurmurDto): Promise<import("./entities/murmur.entity").Murmur>;
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
    like(req: any, id: string): Promise<{
        message: string;
        likeCount?: undefined;
    } | {
        message: string;
        likeCount: number;
    }>;
    unlike(req: any, id: string): Promise<{
        message: string;
        likeCount: number;
    }>;
    getTimeline(req: any, page?: number, limit?: number): Promise<{
        data: import("./entities/murmur.entity").Murmur[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
