import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { generateAccessToken } from 'src/utils/auth.utils';
import { saveBase64ToFile } from 'src/utils/upload.utils';

export const __CREATING__ = -1;
export const __NEED_TFA__ = 0;
export const __CONNECTED__ = 1;
export const __AFK__ = 2;
export const __DISCONNECTED__ = 3;

@Injectable()
export class AuthenticationService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserInput,
          state: __CREATING__,
        } 
      });


      //GENERATE ACCES TOKEN
      const token = generateAccessToken(user.id);
      
      // DEFINE THE AVATAR IMG
      let avatar = createUserInput.avatar;
      avatar = avatar ? 
      'http://localhost:4000/uploads/' + await saveBase64ToFile(avatar, user.id) 
      :
      'http://localhost:4000/uploads/default_avatar.jpg';

      const updatedUser =  this.prisma.user.update({
        where: { id: user.id },
        data: { 
          token,
           avatar }
      });

      return updatedUser;
    } 
    catch (error) {
      console.log(error);
      throw new Error("Échec de la création de l'utilisateur.");
    }
  }

  async findUserByEmail(email: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

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
