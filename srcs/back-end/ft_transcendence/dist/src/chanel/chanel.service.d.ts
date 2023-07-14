import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { Chanel } from './entities/chanel.entity';
import { UsersService } from 'src/users/users.service';
export declare class ChanelService {
    private readonly prisma;
    private readonly user;
    constructor(prisma: PrismaService, user: UsersService);
    create(createChanelInput: CreateChanelInput): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    }, unknown> & {}>;
    findOne(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    }, unknown> & {}>;
    update(id: number, data: UpdateChanelInput): Promise<Chanel>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    }, unknown> & {}>;
    getOwnChanels(user_id: number): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        chanel_size: number;
        max_users: number;
        logo: string;
    }, unknown> & {})[]>;
}
