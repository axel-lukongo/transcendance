import { MailingService } from './mailing.service';
export declare class MailingResolver {
    private mailingService;
    constructor(mailingService: MailingService);
    sendTwoFactorCodeByEmail(email: string, code: string): Promise<boolean>;
}
