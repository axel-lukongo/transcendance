import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.dto';
export declare class UserService {
    private readonly prsm;
    constructor(prsm: PrismaClient);
    createUser(userDto: CreateUserDto): Promise<User>;
    deleteUser(id: number): Promise<User | null>;
    getUserByNickname(nick: string): Promise<User | null>;
    updateUser(id: number, userData: Partial<User>): Promise<User | null>;
}
