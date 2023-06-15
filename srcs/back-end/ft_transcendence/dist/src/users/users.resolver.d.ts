import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    loginUser(loginUserInput: LoginUserInput): Promise<import(".prisma/client").User>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    updateUser(updateUserInput: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    removeUser(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
}
