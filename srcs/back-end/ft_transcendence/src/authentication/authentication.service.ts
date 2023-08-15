import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { generateAccessToken } from 'src/utils/auth.utils';
import { saveBase64ToFile } from 'src/utils/upload.utils';

export const __CONNECTED__ = 1;
export const __AFK__ = 2;
export const __DISCONNECTED__ = 3;

@Injectable()
export class AuthenticationService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      let { avatar, ...rest } = createUserInput;
      const user = await this.prisma.user.create({
        data: {
          email: rest.email,
          nickname: rest.nickname,
          intra_login: rest.intra_login,
          state: __CONNECTED__
        } 
      });

      //lors de la creation du User nous mettons a jour le token
      // et un bouleen servant a la verification de la connexion du user
      // et la creation de l'avatr du user 
      const token = generateAccessToken(user.id);
      avatar = avatar ? 
      'http://localhost:4000/uploads/' + await saveBase64ToFile(avatar, user.id) 
      :
      'http://localhost:4000/uploads/default_avatar.jpg';

      const updatedUser =  this.prisma.user.update({
        where: { id: user.id },
        data: { token, avatar }
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
    let user = await this.prisma.user.findUnique({ where: { intra_login } });

    // Cette verification permet de savoir si cette query est lancé a l'authentification 
    if (user) {
      const token = generateAccessToken(user.id);
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { token, state: __CONNECTED__ },
      });
    }
    return user;
  }
}
