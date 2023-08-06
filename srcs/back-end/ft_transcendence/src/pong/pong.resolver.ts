import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PongService } from './pong.service';
import { Pong } from './entities/pong.entity';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PubSub } from 'graphql-subscriptions';
import { PlayerResolver } from './player/player.resolver';
import { BallResolver } from './ball/ball.resolver';
import { Ball } from './ball/entities/ball.entity';
import { Player } from './player/entities/player.entity';
import { UpdateBallInput } from './ball/dto/update-ball.input';
import { UsersResolver } from 'src/users/users.resolver';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

const pubSub = new PubSub();
const PONG_UPDATE_EVENT = 'PongUp';

@Resolver(() => Pong)
export class PongResolver {

  private start : boolean;
  private stop : boolean;
  private  interval : NodeJS.Timer | null;

  // Vérifier les limites de l'environnement pour gérer les rebonds
  private maxX: number;  // Valeur maximale de la coordonnée X (par exemple, 100%)
  private maxY: number;  // Valeur maximale de la coordonnée Y (par exemple, 100%)
  private minX: number;  // Valeur minimale de la coordonnée X (par exemple, 0%)
  private minY: number;  // Valeur minimale de la coordonnée Y (par exemple, 0%)  

  // vitesse de deplacement en %
  private speed: number;
  constructor(private readonly pongService: PongService,
              private readonly player: PlayerResolver,
              private readonly ball: BallResolver,
              private readonly user: UsersResolver) {
                this.start = false;
                this.stop = false;
                this.interval = null;
                this.maxX = 100;
                this.maxY = 100;
                this.minX = 0;
                this.minY = 0;
                this.speed = 5;
              }

  @Mutation(() => Pong)
  createPong(@Args('createPongInput') createPongInput: CreatePongInput) {
    return this.pongService.create(createPongInput);
  }

  @Query(() => [Pong], { name: 'findPongs' })
  findAll() {
    return this.pongService.findAll();
  }

  @Query(() => Pong, { name: 'findPong' })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.findUnique(id);
  }


  // @Query(() => Pong, )
  // findGame(@Args('userId', { type: () => Int }) userId: number) {
  //   return this.pongService.findGame(userId);
  // }

  
  @Mutation(() => Pong)
  removePong(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.remove(id);
  }

  @Mutation(() => Pong)
  updatePong(@Args('updatePongInput') updatePongInput: UpdatePongInput) {
    const pongUp =  this.pongService.update(updatePongInput.id, updatePongInput);
    pubSub.publish(PONG_UPDATE_EVENT, {
      pongUpdatedSubscription : pongUp,
    });
    
    return pongUp;
  }
  @Subscription(() => Pong, {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.pongUpdatedSubscription;
      return resolvedPayload.id === variables.id;
    }
  })
  pongUpdatedSubscription(@Args('id', { type: () => Int }) id: number){
    return pubSub.asyncIterator(PONG_UPDATE_EVENT);
  }

  @Mutation(() => Boolean)
  stopPong() {
    if (this.start === true) {
      this.start = false;
      this.stop = true;
      clearInterval(this.interval);
      this.interval = null;
      return true;
    }

    return false; // Renvoyer false si l'appel périodique n'était pas en cours
  }

  @Mutation(() => Boolean)
  async startPong(  @Args('id', { type: () => Int }) id: number,
                        @Args('playerId', { type: () => Int }) playerId: number,
                        @Args('otherPlayerId', { type: () => Int }) otherPlayerId: number,
                        @Args('pongId', { type: () => Int }) pongId: number) {

    if (this.start === true || this.stop === true) {
      return false;
    }
    this.start = true;
    
    this.interval = setInterval(async () => {

      const currentPong = await this.findUnique(pongId);

      const ball  = await this.ball.findUnique(id);
  
      const player = await this.player.findPlayer(playerId);

      const otherPlayer = await this.player.findPlayer(otherPlayerId);
      otherPlayer.positionX += 80;
      await this.ballMove(ball, player, otherPlayer, currentPong);
    }, 50);

    return true;
  }

  private async updateRankLevel(id: number) {
    enum Rank {
      Bronze = "Bronze",
      Silver = "Silver",
      Gold = "Gold",
    }
  
    const levelRanges = {
      [Rank.Bronze]: { min: 1, max: 9, xpGain: 2 },
      [Rank.Silver]: { min: 10, max: 19, xpGain: 1 },
      [Rank.Gold]: { min: 20, max: 30, xpGain: 0.5 },
    };
  
    const getNextRank = (rank: Rank | null): Rank | null => {
      if (rank === Rank.Bronze) {
        return Rank.Silver;
      } else if (rank === Rank.Silver) {
        return Rank.Gold;
      } else {
        return null;
      }
    };
  
    const getRank = (rank: string): Rank | null => {
      switch (rank) {
        case Rank.Bronze:
          return Rank.Bronze;
        case Rank.Silver:
          return Rank.Silver;
        case Rank.Gold:
          return Rank.Gold;
        default:
          return null;
      }
    };
  
    const user = await this.user.findUserById(id);
    if (!user || user.level === 30) {
      return;
    }
    
    const rank = getRank(user.rank);
    if (!rank) {
      return;
    }
  
    const { xpGain, max, min } = levelRanges[rank];
    const rangeSize = max - min;
    const curXpPercentage = ((user.level - min) / rangeSize) * 100;
    const xpGainPercentage = (xpGain / rangeSize) * 100;
    const totalXpPercentage = curXpPercentage + xpGainPercentage;
    const nextRank = getNextRank(rank);
  
    const dataUpdateUser: UpdateUserInput = {
      id: user.id,
      level: user.level + xpGain,
      rank: totalXpPercentage === 100 ? nextRank?.toString() : rank?.toString(),
    };
  
    const updatedUser = await this.user.updateUser(dataUpdateUser);
    console.log(updatedUser);
  }

  private async  ballMove(  ball: Ball, player: Player, otherPlayer: Player, currentPong: Pong): Promise<void> {

    const newPotentialX = ball.positionX + (ball.directionX * this.speed) /100;
    const newPontantialY = ball.positionY + (ball.directionY * this.speed) /100;
  
    // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
    const rightWall = newPotentialX > this.maxX;
    const leftWall = newPotentialX < this.minX;
    const HitWallX = rightWall || leftWall;
    const HitWallY = newPontantialY > this.maxY || newPontantialY < this.minY;

    // Gérer les rebonds en inversant la direction lorsque la balle atteint player 
    const hitGreenStickPosX = newPotentialX <= player.positionX -3;
    const hitGreenStickPosY = newPontantialY >= player.positionY && newPontantialY <= player.positionY + 25; // 25% de la taille de l'écran
    
    // Gérer les rebonds en inversant la direction lorsque la balle atteint otherPlayer
    const hitRedStickPosX = newPotentialX >= otherPlayer.positionX +3
    const hitRedStickPosY = newPontantialY >= otherPlayer.positionY && newPontantialY <= otherPlayer.positionY + 25; // 25% de la taille de l'écran
    
    //position retenu au final
    const newX = HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newPotentialX;
    const newY = HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newPontantialY;

    //TOUCH A WALL
    if (HitWallX || HitWallY) { 
      const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
      const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;

      if (HitWallX)
      {
        if (rightWall)
        {
          currentPong.scoreUser1 += 1;
          if (currentPong.scoreUser1 == 5)
          {
            currentPong.winnerId = player.userId;
            currentPong.loserId = otherPlayer.userId;
          }
        }
        else
        {
          currentPong.scoreUser2 += 1;
          if (currentPong.scoreUser2 == 5)
          {
            currentPong.winnerId = otherPlayer.userId;
            currentPong.loserId = player.userId;
          }
        }
        const DataUpdatePong : UpdatePongInput = {
          ...currentPong
        }
          this.updatePong(DataUpdatePong);
        if (currentPong.scoreUser1 >= 5 || currentPong.scoreUser2 >= 5)
        {
          this.stopPong();
          
        }
        const DataUpdateBall : UpdateBallInput = {
          id : ball.id,
          positionX : 50,
          positionY : 50,
          directionX : Math.random() < 0.5 ? 20 : -10,
          directionY : Math.random() < 0.5 ? 10 : -20,
        }
        this.ball.updateBall(DataUpdateBall);

      }
      else
      {
        const DataUpdateBall : UpdateBallInput = {
          id : ball.id,
          positionX : newX,
          positionY : newY,
          directionX : newDirectionX,
          directionY : newDirectionY,
        }
        this.ball.updateBall(DataUpdateBall);
      }
    }
    // TOUCH THE PLAYER 
    else if (hitGreenStickPosX && hitGreenStickPosY) {
      const newDirectionX = (hitGreenStickPosX && hitGreenStickPosY) ? -ball.directionX : ball.directionX;
      
      const DataUpdateBall : UpdateBallInput = {
        id : ball.id,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      this.ball.updateBall(DataUpdateBall);
    }
    //TOUCH THE OTHER PLAYER
    else if (hitRedStickPosX && hitRedStickPosY) {
      const newDirectionX = (hitRedStickPosX && hitRedStickPosY) ? -ball.directionX : ball.directionX;

      const DataUpdateBall : UpdateBallInput = {
        id : ball.id,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      this.ball.updateBall(DataUpdateBall);
    }
    //TOUCH ANYTHING BUT UPDATE THE BALL POSITION
    else {
      
      const DataUpdateBall : UpdateBallInput = {
        id : ball.id,
        positionX : newX,
        positionY : newY,
      }
      this.ball.updateBall(DataUpdateBall);
    }
  }
}
