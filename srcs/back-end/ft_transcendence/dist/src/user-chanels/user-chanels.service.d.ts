import { AddUserChanel } from './dto/add-user-chanel.input';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateChanelUserInput } from './dto/update-chanel-user.input';
export declare class UserChanelsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMyChanels(user_id: number, private_chan: boolean): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {})[]>;
    findMyRequestChanels(user_id: number): Promise<(import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {})[]>;
    addUser(input: AddUserChanel): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}>;
    acceptRequest(Requestkey: UpdateChanelUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}>;
    update(key: UpdateChanelUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}>;
    isAdministrator(key: UpdateChanelUserInput, userID: number): Promise<boolean>;
    findMembersOfChan(channel_id: number): Promise<({
        user: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            token: string;
            state: number;
            tfa_code: string;
            email: string;
            intra_login: string;
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
    delete(key: UpdateChanelUserInput): Promise<import("@prisma/client/runtime/library").GetResult<{
        user_id: number;
        chanel_id: number;
        pending: boolean;
        is_muted: boolean;
        is_admin: boolean;
        mute_start_time: number;
    }, unknown> & {}>;
    UserBanInChannel(userId: number, channelId: number): Promise<boolean>;
    IsOwnerInChannel(userId: number, channelId: number): Promise<boolean>;
}
