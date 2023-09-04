import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { generateAccessToken } from 'src/utils/auth.utils';
import { saveBase64ToFile } from 'src/utils/upload.utils';

export const __CREATING__ = -2;
export const __NEED_TFA__ = -1;
export const __ACCESS__ = 1;

export const __CONNECTED__ = 1;
export const __AFK__ = 2;
export const __DISCONNECTED__ = 3;
export const __IN_GAME__= 4;

@Injectable()
export class AuthenticationService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {

    let  {avatar, ...restCreateUserInput} = createUserInput;
    try {
      const user = await this.prisma.user.create({
        data: {
          ...restCreateUserInput,
          state: __CONNECTED__,
          connection_status: __CREATING__,
        } 
      });

      //GENERATE ACCES TOKEN
      const token = generateAccessToken(user.id);

      const updatedUser =  this.prisma.user.update({
        where: { id: user.id },
        data: { 
          token
        }
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
        data: { 
          token, 
          state: __CONNECTED__,
          connection_status: __ACCESS__},
      });
    }
    return user;
  }
}
