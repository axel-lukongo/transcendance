import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const isUserCreationRequest = req.body?.operationName === 'CreateUser';
    const isMakeAuthenticationRequest = req.body?.operationName === 'MakeAuthentication';
    const isCheckTwoAuthenticationFactorRequest = req.body?.operationName === 'checkTwoAuthenticationFactor';
    // const isUploadsRequest = req.originalUrl.includes('/uploads');

    // Vérifie si la requête doit être vérifiée avec le jeton
    const requiresTokenCheck = !(isUserCreationRequest || isMakeAuthenticationRequest || isCheckTwoAuthenticationFactorRequest);// || isUploadsRequest);
    if (requiresTokenCheck) {
      if (!token) {
        res.status(401).json({ message: 'Token manquant' });
        return;
      }
      try {
        const decodedToken = verify(token, process.env.CLIENT_SECRET_BACKEND) as { userId: number };
        req.userId = decodedToken.userId;
      } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
        return;
      }
    }
    next();
  }
}
