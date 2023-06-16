import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    login(loginUserInput: LoginUserInput): Promise<import(".prisma/client").User>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: number, data: UpdateUserInput): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
}
