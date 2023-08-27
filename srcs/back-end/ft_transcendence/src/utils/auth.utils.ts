import * as crypto from 'crypto';
import { sign } from 'jsonwebtoken';


export const generateTwoFactorCode = (): string => {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    return code;
  };
  
  export const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1d'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};