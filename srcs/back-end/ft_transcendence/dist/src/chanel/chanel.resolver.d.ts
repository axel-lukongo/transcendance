import { ChanelService } from './chanel.service';
import { Chanel } from './entities/chanel.entity';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
import { AddUserChanel } from './dto/add-user-chanel.input';
export declare class ChanelResolver {
    private readonly chanelService;
    constructor(chanelService: ChanelService);
    createChanel(createChanelInput: CreateChanelInput): Promise<import(".prisma/client").Chanel>;
    findAll(): Promise<Chanel[]>;
    findOne(id: number): Promise<Chanel>;
    updateChanel(_updateArgs: UpdateChanelInput): Promise<Chanel>;
    removeChanel(id: number): Promise<import(".prisma/client").Chanel>;
    addUser(addUserChanel: AddUserChanel): Promise<import(".prisma/client").Users_Chanels>;
}
