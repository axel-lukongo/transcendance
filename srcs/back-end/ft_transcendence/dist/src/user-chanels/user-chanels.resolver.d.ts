import { UsersChanels } from './entities/user_chanel.entity';
import { ChanelService } from 'src/chanel/chanel.service';
import { UserChanelsService } from './user-chanels.service';
import { AddUserChanel } from './dto/add-user-chanel.input';
import { UpdateChanelUserInput } from './dto/update-chanel-user.input';
export declare class UserChanelsResolver {
    private readonly chanelService;
    private readonly userChanelService;
    constructor(chanelService: ChanelService, userChanelService: UserChanelsService);
    addUser(addUserChanel: AddUserChanel): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}) | "this user is banned">;
    ChanelsOwner(chanel: UsersChanels): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {}>;
    acceptRequest(Requestkey: UpdateChanelUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}>;
    chanelRequest(context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {})[]>;
    findMyChanels(context: any, private_chan: boolean): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        owner_id: number;
        chanel_name: string;
        logo: string;
        private: boolean;
        directMsg: boolean;
        interlocutor_id: number;
        interlocutor_avatar: string;
        interlocutor_name: string;
        AdminList: number[];
    }, unknown> & {})[]>;
    findMembers(channel_id: number): Promise<({
        user: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            token: string;
            state: number;
            connection_status: number;
            tfa_code: string;
            email: string;
            nickname: string;
            avatar: string;
            rank: string;
            level: number;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {})[]>;
    deleteChanelUser(key: UpdateChanelUserInput, context: any): Promise<UpdateChanelUserInput | "you don t have the permission">;
    updateChanelUser(key: UpdateChanelUserInput, context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}) | "you don t have the permission">;
    updateChanelAdmin(key: UpdateChanelUserInput, context: any): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}) | "you don t have the permission">;
}
