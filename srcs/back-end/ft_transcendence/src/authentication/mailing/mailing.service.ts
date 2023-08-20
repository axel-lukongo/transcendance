import { Injectable } from '@nestjs/common';
import { GetAccessTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailingService {
  
  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID_GMAIL_API,
      process.env.CLIENT_SECRET_GMAIL_API,
      'https://developers.google.com/oauthplayground',
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN_GMAIL_API,
    });
  
    let accessToken: GetAccessTokenResponse;
    try {
      accessToken = await oauth2Client.getAccessToken();
    } 
    catch (error) {
      console.error('Failed to create access token:', error);
      throw new Error('Failed to create access token');
    }

    const accessTokenString: string = accessToken as string;
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

  async sendMail(emailDest: string, code: string) {
    try {
      const transport = await this.setTransport();
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailDest,
        subject: 'Two-Factor Authentication Code',
        text: `Your two-factor authentication code is: ${code}`,
      };
  
      const result = await transport.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
