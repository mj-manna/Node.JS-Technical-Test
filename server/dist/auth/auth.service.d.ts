import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
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
            followers: User[];
            following: User[];
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
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
            followers: User[];
            following: User[];
        };
        token: string;
    }>;
    private generateToken;
    validateUser(userId: number): Promise<User>;
}
