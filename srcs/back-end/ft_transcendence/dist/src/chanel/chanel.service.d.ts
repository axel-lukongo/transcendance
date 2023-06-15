import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
import { UsersService } from 'src/users/users.service';
import { AddUserChanel } from './dto/add-user-chanel.input';
export declare class ChanelService {
    private readonly prisma;
    constructor(prisma: PrismaService, user: UsersService);
    create(createChanelInput: CreateChanelInput): Promise<import(".prisma/client").Chanel>;
    findAll(): Promise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    update(id: number, data: UpdateChanelInput): Promise<Chanel>;
    remove(id: number): Promise<import(".prisma/client").Chanel>;
    addUser(input: AddUserChanel): Promise<import(".prisma/client").Users_Chanels>;
}
