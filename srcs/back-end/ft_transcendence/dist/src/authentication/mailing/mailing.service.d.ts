export declare class MailingService {
    private setTransport;
    sendMail(emailDest: string, code: string): Promise<void>;
}
