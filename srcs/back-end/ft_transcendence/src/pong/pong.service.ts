import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { Pong } from './entities/pong.entity';
import { User } from 'src/users/entities/user.entity';
import { LeaderBoard } from './pong.resolver';




@Injectable()
export class PongService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPongInput: CreatePongInput) {
      return this.prisma.pong.create({
        data: createPongInput
      });
  }
  
  findAll() {
    return this.prisma.pong.findMany({});
  }

  findUnique (id : number ) {
    return this.prisma.pong.findUnique({ where : {id}})
  }

  async myHistoryMatch(userId: number) {
    try {
      const games = await this.prisma.pong.findMany({
        where: {
          OR: [
            { userId1: userId },
            { userId2: userId },
          ],
        },
        include: {
          user1: true,
          user2: true,
        },
      });
  
      if (games.length === 0) {
        throw new Error('No game found for the given userId.');
      }
  
      return games;
    } catch (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }
  }


  async calculateWins(user: User): Promise<number> {
    const userPongWins = await this.prisma.pong.count({
      where: {
        AND: [
          { winnerId: user.id },
          {
            OR: [
              { userId1: user.id },
              { userId2: user.id },
            ],
          },
        ],
      },
    });

    return userPongWins;
  }
  async historyMatch() {
    const allUsers = await this.prisma.user.findMany({});
    
    const usersWithWins = await Promise.all(
      allUsers.map(async (user) => ({
        user,
        wins: await this.calculateWins(user),
      }))
      );

    const sortedUsers = usersWithWins.sort((a, b) => {
      if (a.user.level !== b.user.level) {
        return b.user.level - a.user.level;
      } else if (a.wins !== b.wins) {
        return b.wins - a.wins;
      } else {
        return a.user.nickname.localeCompare(b.user.nickname); // Tri alphabétique
      }
    });

    let currentGrade = 1;
    let level = 1;
    let win = 1;


    const leaderBoard: LeaderBoard[] = sortedUsers.map((userWithWins, index) => {
      if (userWithWins.user.level !== level || userWithWins.wins !== win) {
        level = userWithWins.user.level;
        win = userWithWins.wins;
        currentGrade = index + 1;
      }

      return {
        grade: currentGrade,
        nickname: userWithWins.user.nickname,
        level: userWithWins.user.level,
        rank: userWithWins.user.rank,
      };
    });

    return leaderBoard;
  }

  
  
  update(id: number, updatePongInput: UpdatePongInput) {
    return this.prisma.pong.update({
      where : {id},
      data : updatePongInput
    })
  }

  remove(id: number) {
    return `This action removes a #${id} pong`;
  }
}
