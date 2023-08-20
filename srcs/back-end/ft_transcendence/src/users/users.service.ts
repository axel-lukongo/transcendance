import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'prisma/prisma.service';
import { saveBase64ToFile } from 'src/utils/upload.utils';


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
  
  async update(id: number, data: UpdateUserInput) {

    data.avatar = data.avatar ? 
      'http://localhost:4000/uploads/' + await saveBase64ToFile(data.avatar, id) 
      :
      'http://localhost:4000/uploads/default_avatar.jpg';
    

    return this.prisma.user.update({
      where: {id: data.id},
      data
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id: id}});
  }

  researchUsers(research: string, user_id: number) {
    let users = this.prisma.user.findMany({
      where: {
        nickname: {
          contains: research
        },
        NOT: {
          OR: [
            { id: user_id },
            { contact: { some: {
               OR: [
                  {user: { id: user_id }},
                  {contact: { id: user_id }}
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

  researchUsersForAddChanel(user_id: number, chan_id: number) {
    return this.prisma.user.findMany({
      where: {
        nickname: { contains: "" },
        NOT: {
          OR: [
            { id: user_id },
            { chanels: {
              some: { chanel_id: chan_id }
            }},
			{ user_ban: {
				some: {
				  channel_id: chan_id
				}
			  }
	  		}
          ]
        }
      }
    })
  }

}