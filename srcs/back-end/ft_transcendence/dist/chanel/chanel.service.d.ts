import { CreateChanelInput } from './dto/create-chanel.input';
import { UpdateChanelInput } from './dto/update-chanel.input';
export declare class ChanelService {
    create(createChanelInput: CreateChanelInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChanelInput: UpdateChanelInput): string;
    remove(id: number): string;
}
