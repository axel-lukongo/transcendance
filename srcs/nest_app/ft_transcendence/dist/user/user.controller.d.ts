import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(userDto: CreateUserDto): Promise<User>;
    deleteUser(id: number): Promise<User | null>;
    getUserByNickname(nick: string): Promise<User | null>;
    updateUserToken(id: number, { token }: {
        token: number;
    }): Promise<User | null>;
    updateUserNickname(id: number, { nickname }: {
        nickname: string;
    }): Promise<User | null>;
    updateUserAvatarImg(id: number, { avatar }: {
        avatar: string;
    }): Promise<User | null>;
}
