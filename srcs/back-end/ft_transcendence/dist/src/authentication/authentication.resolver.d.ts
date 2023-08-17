import { User } from 'src/users/entities/user.entity';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/users/users.service';
import { MailingService } from './mailing/mailing.service';
export declare const CHANGE_STATE = "changeState";
export declare class AuthenticationResolver {
    private readonly authService;
    private readonly userService;
    private readonly mailingService;
    private intraLogin;
    private email;
    private user;
    constructor(authService: AuthenticationService, userService: UsersService, mailingService: MailingService);
    createUser(createAuthenticationInput: CreateAuthenticationInput): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
    makeAuthentication(code: string): Promise<User | {
        error: string;
    }>;
    checkTwoAuthenticationFactor(code: string): Promise<User>;
    updateState(new_state: number, user_id: number, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
}
