import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    userId?: number;
}
export declare class AuthMiddleware implements NestMiddleware {
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
}
