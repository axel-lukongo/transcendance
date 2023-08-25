"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const nodemailer = require("nodemailer");
let MailingService = exports.MailingService = class MailingService {
    async setTransport() {
        const OAuth2 = googleapis_1.google.auth.OAuth2;
        const oauth2Client = new OAuth2(process.env.CLIENT_ID_GMAIL_API, process.env.CLIENT_SECRET_GMAIL_API, 'https://developers.google.com/oauthplayground');
        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN_GMAIL_API,
        });
        let accessToken;
        try {
            accessToken = await oauth2Client.getAccessToken();
        }
        catch (error) {
            console.error('Failed to create access token:', error);
            throw new Error('Failed to create access token');
        }
        const accessTokenString = accessToken;
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID_GMAIL_API,
                clientSecret: process.env.CLIENT_SECRET_GMAIL_API,
                refreshToken: process.env.REFRESH_TOKEN_GMAIL_API,
                accessToken: accessTokenString,
            },
        });
        return transport;
    }
    async sendMail(emailDest, code) {
        try {
            const transport = await this.setTransport();
            const mailOptions = {
                from: process.env.EMAIL,
                to: emailDest,
                subject: 'Two-Factor Authentication Code',
                text: `Your two-factor authentication code is: ${code}`,
            };
            const result = await transport.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
};
exports.MailingService = MailingService = __decorate([
    (0, common_1.Injectable)()
], MailingService);
//# sourceMappingURL=mailing.service.js.map