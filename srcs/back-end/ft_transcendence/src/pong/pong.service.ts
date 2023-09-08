import { Injectable } from '@nestjs/common';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { StatisticMatch } from './pong.resolver';


interface UserStats {
  wins: number;
  defeats: number;
  ratio: number;
}

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


  async findCurrentGame(userId: number) {
    const game = await this.prisma.pong.findFirst({
      where: {
        OR: [
          { userId1: userId },
          { userId2: userId },
        ],
      },
      orderBy: {
        versusDate: 'desc',
      },
    });

    return game;
  }


  async myMatchStatistic(userId: number): Promise<StatisticMatch | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
        return null;
    }
  
    const leaderBoard: StatisticMatch[] = await this.leaderBoard();
  
    const userStatistics = leaderBoard.find(player => player.nickname === user.nickname);
  
    return userStatistics || null;
  }
  

  async myMatchHistory(userId: number) {
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
  
      return games;
  }


  async calculateStat(user: User): Promise<UserStats> {
    const totalGames = await this.prisma.pong.findMany({
      where: {
        OR: [
          { userId1: user.id },
          { userId2: user.id },
        ],
      },
    });
  
    let wins = 0;
    let defeats = 0;
  
    totalGames.forEach(game => {
      if (game.winnerId === user.id) {
        wins++;
      } else if (game.loserId === user.id) {
        defeats++;
      }
    });

    const totalMatches = wins + defeats;
    const ratio = totalMatches === 0 ? 0 : wins / totalMatches;
  
    return { wins, defeats, ratio };
  
  }
  
  async leaderBoard() {
    const allUsers = await this.prisma.user.findMany({});
    
    const usersWithStats = await Promise.all(
      allUsers.map(async (user) => ({
        user,
        stat: await this.calculateStat(user),
      }))
    );
  
    const sortedUsers = usersWithStats.sort((a, b) => {
      if (a.user.level !== b.user.level) {
        return b.user.level - a.user.level;
      } else if (a.stat.wins !== b.stat.wins) {
        return b.stat.wins - a.stat.wins; // Tri par victoires
      } else {
        return a.user.nickname.localeCompare(b.user.nickname); // Tri alphabétique
      }
    });
  
    let currentGrade = 1;
    let level = 1;
    let win = 1;
  
    const leaderBoard: StatisticMatch[] = sortedUsers.map((userWithStats, index) => {
      if (userWithStats.user.level !== level || userWithStats.stat.wins !== win) {
        level = userWithStats.user.level;
        win = userWithStats.stat.wins;
        currentGrade = index === 0 ? 1 : currentGrade + 1 ;
      }
  
      return {
        grade:    currentGrade,
        nickname: userWithStats.user.nickname,
        level:    userWithStats.user.level,
        rank:     userWithStats.user.rank,
        wins:     userWithStats.stat.wins,
        defeats:  userWithStats.stat.defeats,
        ratio:    userWithStats.stat.ratio
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
