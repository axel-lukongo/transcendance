import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const isMakeAuthenticationRequest = req.body?.operationName === 'MakeAuthentication';
    const isGraphql = (req.url === '/graphql');
    
    // Vérifie si la requête doit être vérifiée avec le token
    if (!isMakeAuthenticationRequest ) {

      if (!token ) {

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
          console.log('error', error);
          res.status(401).json({ message: 'Token invalide' });
        }
      }
      check();
    }
    else
      next();
  }
}
