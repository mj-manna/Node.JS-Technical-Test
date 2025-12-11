import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
            followers: import("../users/entities/user.entity").User[];
            following: import("../users/entities/user.entity").User[];
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
            followers: import("../users/entities/user.entity").User[];
            following: import("../users/entities/user.entity").User[];
        };
        token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
