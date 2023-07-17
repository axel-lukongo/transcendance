import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { sign } from 'jsonwebtoken';

const generateAccessToken = (userId: number): string => {
  const secret = process.env.CLIENT_SECRET_BACKEND; // clé secrète pour la signature du token
  const expiresIn = '1h'; // Durée de validité du token (1 heure dans cet exemple)

  const payload = { userId };
  return sign(payload, secret, { expiresIn });
};

@Injectable()
export class AuthenticationService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({
        data: createUserInput
      });

      //lors de la creation du User nous mettons a jour le token
      // et un bouleen servant a la verification de la connexion du user
      const token = generateAccessToken(user.id);
      const is_connecting = false;
      await this.prisma.user.update({
        where: { id: user.id },
        data: { token, is_connecting }
      });

      // Récupérez l'utilisateur mis à jour avec le jeton d'accès
      const updatedUser = await this.prisma.user.findUnique({
        where: { id: user.id }
      });

      // Retournez l'utilisateur mis à jour 
      return updatedUser;
    } 
    catch (error) {
      console.log(error);
      throw new Error("Échec de la création de l'utilisateur.");
    }
  }

  async findUserByIntraLogin(intra_login: string) {
    const user = await this.prisma.user.findUnique({ where: { intra_login } });

    // Cette verification permet de savoir si cette query est lancé a l'authentification 
    if (user && user.is_connecting) {
      const token = generateAccessToken(user.id);
      const is_connecting = false;
      await this.prisma.user.update({
        where: { id: user.id },
        data: { token, is_connecting },
      });
    }
    return user;
  }
}
