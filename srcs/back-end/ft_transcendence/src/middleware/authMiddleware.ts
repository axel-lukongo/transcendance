import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';
import { generateAccessToken } from 'src/utils/auth.utils';

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const isUserCreationRequest = req.body?.operationName === 'CreateUser';
    const isMakeAuthenticationRequest = req.body?.operationName === 'MakeAuthentication';
    const isCheckTwoAuthenticationFactorRequest = req.body?.operationName === 'CheckTwoAuthenticationFactor';
<<<<<<< HEAD

    // Vérifie si la requête doit être vérifiée avec le jeton
    const requiresTokenCheck = !(isUserCreationRequest || isMakeAuthenticationRequest || isCheckTwoAuthenticationFactorRequest);

    if (requiresTokenCheck && token /* a enlever */) {
        
        if (!token) {
            res.status(401).json({ message: 'Token manquant' });
            return;
        }
        
        async function check() {
            
            try {
                const prisma = new PrismaService();
                const decodedToken = verify(token, process.env.CLIENT_SECRET_BACKEND) as { userId: number };
                const user = await prisma.user.findUnique({
                    where: {token}
                })
                
                await prisma.$disconnect();

                if (!user)
                    throw new Error('error');
                
                req.userId = decodedToken.userId;
                next();
                
            } 
            catch (error) {
                res.status(401).json({ message: 'Token invalide' });
            }
        }

        check();
=======
    const isGraphql = (req.url === '/graphql');
    // Vérifie si la requête doit être vérifiée avec le jeton
    const requiresTokenCheck = !(isUserCreationRequest || isMakeAuthenticationRequest || isCheckTwoAuthenticationFactorRequest);
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
>>>>>>> axel
    }
    else
        next();
  }
}
