import { IUser } from '../models/User.model';
export declare class AuthService {
    register(data: {
        email: string;
        password: string;
        name: string;
        role?: 'HR' | 'ADMIN' | 'MANAGER';
    }): Promise<{
        user: IUser;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        user: IUser;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    getUserById(userId: string): Promise<IUser | null>;
}
//# sourceMappingURL=auth.service.d.ts.map