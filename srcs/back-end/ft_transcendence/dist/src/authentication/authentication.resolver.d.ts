import { AuthenticationService } from './authentication.service';
import { MailingService } from './mailing/mailing.service';
import { UpdateAuthenticationInput } from './dto/update-authentication.input';
import { UsersResolver } from 'src/users/users.resolver';
export declare class AuthenticationResolver {
    private readonly authService;
    private readonly userResolveur;
    private readonly mailingService;
    constructor(authService: AuthenticationService, userResolveur: UsersResolver, mailingService: MailingService);
    createUser(updateAuthenticationInput: UpdateAuthenticationInput, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
    makeAuthentication(code: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}) | {
        error: string;
    }>;
    checkTwoAuthenticationFactor(code: string, context: any): Promise<import("@prisma/client/runtime/library").GetResult<{
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
    }, unknown> & {}>;
}
