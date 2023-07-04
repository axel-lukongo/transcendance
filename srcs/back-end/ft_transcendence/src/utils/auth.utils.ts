import { sign } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import axios from 'axios';

export const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};

export const generateTwoFactorCode = (): string => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  console.log('code mail :', code);
  return code;
};

interface AuthenticatedRequest extends Request {
  userId?: number;
}

const getTemporaryEmail = async () => {
  try {
    const response = await axios.get('https://api.temp-mail.org/request/new/');
    const { email } = response.data;
    return email;
  } catch (error) {
    console.error('Error fetching temporary email:', error);
    return null;
  }
};



export const sendTwoFactorCodeByEmail = async (code: string, email: string) => {
  const fromEmail = await getTemporaryEmail();

  if (fromEmail) {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASS
      }
    });

    const mailOptions = {
      from: fromEmail,
      to: email,
      subject: 'Two-Factor Authentication Code',
      text: `Your two-factor authentication code is: ${code}`,
    };

    try {
      await transport.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}



@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const isUserCreationRequest = req.body.operationName === 'CreateUser';
    const isMakeAuthenticationRequest = req.body.operationName === 'MakeAuthentication';
    const isGraphqlEndpoint = req.originalUrl === '/graphql';

    // Vérifie si la requête n'est pas une création / connexion  d'utilisateur 
    if (!isUserCreationRequest && !isMakeAuthenticationRequest && !isGraphqlEndpoint) {
      if (token) {
        try {
          const decodedToken = verify(token, process.env.CLIENT_SECRET_BACKEND) as { userId: number };
          req.userId = decodedToken.userId;
        } catch (error) {
          res.status(401).json({ message: 'Token invalide' });
          
          return;
        }
      } 
      else {
        res.status(401).json({ message: 'Token manquant' });
        return;
      }
    }

    next();
  }
}


