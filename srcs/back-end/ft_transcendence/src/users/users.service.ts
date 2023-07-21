import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({});
  }

  findUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

    findUserByToken(token: string) {
    return this.prisma.user.findUnique({where: {token}});
  }
  

  update(id: number, data: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id: id}});
  }

  researchUsers(research: string, user_id: number) {
    let users =  this.prisma.user.findMany({
      where: {
        nickname: {
          contains: research
        },
        NOT: {
          OR: [
            { contact: { some: {
               OR: [
                  {user: {id: user_id}},
                  {contact: {id: user_id}}
                ]
            }}},
            { reverse_contact: {some: {
              OR: [
                {user: {id: user_id}},
                {contact: {id: user_id}}
              ]
            }}}
          ]
        }
      }
    })
    return (users);
  }

}