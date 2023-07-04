import { sign } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

export const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};

export const generateTwoFactorCode = (): string => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  return code;
};

interface AuthenticatedRequest extends Request {
  userId?: number;
}


export const sendTwoFactorCodeByEmail = async (code: string, email: string) => {
  const fromEmail = process.env.EMAIL_2AF
  console.log(email);
  console.log(process.env.EMAIL_2AF_PASS);

  if (fromEmail) {
    const transport = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.EMAIL_2AF,
        pass: process.env.EMAIL_2AF_PASS
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
    const ischeckTwoAuthenticationFactorRequest = req.body.operationName === 'checkTwoAuthenticationFactor';
    const isGraphqlEndpoint = req.originalUrl === '/graphql';

    // Vérifie si la requête n'est pas une création / connexion  d'utilisateur 
    if (!isUserCreationRequest && !isMakeAuthenticationRequest 
      && !ischeckTwoAuthenticationFactorRequest && !isGraphqlEndpoint) {
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


