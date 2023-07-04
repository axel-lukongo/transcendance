import { sign } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};

interface AuthenticatedRequest extends Request {
  userId?: number;
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
