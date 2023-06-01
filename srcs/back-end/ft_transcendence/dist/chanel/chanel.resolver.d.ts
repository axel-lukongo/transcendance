import { ChanelService } from './chanel.service';
import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
export declare class ChanelResolver {
    private readonly chanelService;
    constructor(chanelService: ChanelService);
    create(createChanelInput: CreateChanelInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateChanelInput: UpdateChanelInput): string;
    remove(id: number): string;
}
