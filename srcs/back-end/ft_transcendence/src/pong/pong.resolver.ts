import { Resolver, Query, Mutation, Args, Int, Subscription, Context, ObjectType, Field } from '@nestjs/graphql';
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
import { CreatePlayerInput } from './player/dto/create-player.input';
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';
import { UpdatePlayerInput } from './player/dto/update-player.input';

const pubSub = new PubSub();
const PONG_UPDATE_EVENT = 'PongUp';

@ObjectType()
export class JoinPongResponse {
  @Field(() => Player, { nullable: true })
  player?: Player;

  @Field(() => Player, { nullable: true })
  otherPlayer?: Player;

  @Field(() => Ball, { nullable: true })
  ball?: Ball;

  @Field(() => Pong, { nullable: true })
  pong?: Pong;
}

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
              private readonly waitingRoom: WaitingRoomResolver,
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
  findPong(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.findUnique(id);
  }


  @Query(() => [Pong] )
  myHistoryMatch(@Args('userId', { type: () => Int }) userId: number) {
    return this.pongService.myHistoryMatch(userId);
  }

  
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
  pongUpdatedSubscription(@Context() context,  @Args('id', { type: () => Int }) id: number){
    return pubSub.asyncIterator(PONG_UPDATE_EVENT);
  }
  
  @Mutation(() => JoinPongResponse)
  async joinPong(@Args('userId', { type: () => Int }) userId: number) {

    let player = await this.player.setPlayer(userId);
    if (!player)
    {
      return { player: null };
    }
    
    if (player.waitingRoomId != 1) {
      const otherPlayer =  await this.player.findPlayer(player.opponentPlayerId);
      const ball =  await this.ball.findUnique(player.ballId);
      const pong =  await this.findPong(player.pongId);
      return { player, ball, otherPlayer, pong };
    }
      
    // Si le joueur est dans la salle d'attente 1, récupérer tous les joueurs dans cette salle d'attente
    const listPlayers = await this.player.findAllPlayersInWaitingRoom(1);
    
    if (listPlayers.length > 1) {
      // S'il y a deux joueurs dans la salle d'attente 1, créer une instance de pong
      const createPongInput: CreatePongInput = {
        userId1: listPlayers[0].userId,
        userId2: listPlayers[1].userId,
      };
      const pong = await this.createPong(createPongInput);
      
      //Nouvelle instance de la waintingRoom des Players
      const newWaitingRoom = await this.waitingRoom.createWaitingRoom();
      
      //Nouvelle instance d'un balle pour le Pong 
      const ball = await this.ball.createBall();
      
      const playerData : UpdatePlayerInput ={
        id : listPlayers[1].id,
        opponentPlayerId: listPlayers[0].id,
        host : false,
        waitingRoomId: newWaitingRoom.id,
        positionX : 90,
        ballId: ball.id,
        pongId: pong.id,
      }
      player = await this.player.updatePlayer(playerData);
      
      const otherPlayerData : UpdatePlayerInput ={
        id : listPlayers[0].id,
        opponentPlayerId: listPlayers[1].id,
        host : true,
        waitingRoomId: newWaitingRoom.id,
        ballId: ball.id,
        pongId: pong.id,
      }
      const otherPlayer = await this.player.updatePlayer(otherPlayerData);

      return { player, ball, otherPlayer, pong };
    }
    else {
      return new Promise<JoinPongResponse>(resolve => {
        const interval = setInterval(async () => {
          player = await this.player.findPlayer(player.id);
          if (!player) {
            clearInterval(interval);
            resolve(null);
          }
          else if (player.opponentPlayerId !== 0) {
            clearInterval(interval); // Arrêter l'intervalle
            const otherPlayer = await this.player.findPlayer(player.opponentPlayerId);
            const ball = await this.ball.findUnique(player.ballId);
            const pong = await this.findPong(player.pongId);
            resolve({ player , ball, otherPlayer , pong });
          }
        }, 1000);
      });
    } 
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
  }

  @Mutation(() => Boolean)
  stopPong() {
    if (this.start === true) {
      this.start = false;
      // this.stop = true;
      clearInterval(this.interval);
      this.interval = null;
      return true;
    }

    return false; 
  }

  @Mutation(() => String)
  async endPong(
    @Args('userId', { type: () => Int }) userId: number ): Promise<string> {
    try {
      this.stopPong();
      const player = await this.player.findPlayerByUserId(userId);
      if (!player) {
        return 'Player not found';
      }
      
      if (player.pongId)
      {
        const pong = await this.findPong(player.pongId);
        if (!pong.winnerId)
        {
          const updateDataPong: UpdatePongInput = {
            id: player.pongId,
            scoreUser1: player.host ? 0 : 5,
            scoreUser2: player.host ? 5 : 0,
            winnerId: player.opponentPlayerId,
            loserId: player.id,
          };
          await this.updatePong(updateDataPong);
        }
        if (player.host === true) {
          await this.ball.removeBall(player.ballId);
        }
      }
        await this.player.removePlayer(player.id);
        return 'Pong ended';

    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error('An error occurred during endPong');
    }
  }

  @Mutation(() => Boolean)
  async startPong(  @Args('ballId', { type: () => Int }) ballId: number,
                        @Args('playerId', { type: () => Int }) playerId: number,
                        @Args('otherPlayerId', { type: () => Int }) otherPlayerId: number,
                        @Args('pongId', { type: () => Int }) pongId: number) {

    if (this.start === true) {
      return false;
    }
    this.start = true;
    
    this.interval = setInterval(async () => {

      const currentPong = await this.findPong(pongId);

      const ball  = await this.ball.findUnique(ballId);
  
      const player = await this.player.findPlayer(playerId);

      const otherPlayer = await this.player.findPlayer(otherPlayerId);
    
      await this.ballMove(ball, player, otherPlayer, currentPong);
    }, 50);

    return true;
  }


  private async  ballMove(  ball: Ball, player: Player, otherPlayer: Player, currentPong: Pong): Promise<void> {

    const newPotentialX = ball.positionX + (ball.directionX * this.speed) /100;
    const newPotantialY = ball.positionY + (ball.directionY * this.speed) /100;
  
    // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
    const rightWall = newPotentialX > this.maxX;
    const leftWall = newPotentialX < this.minX;
    const HitWallX = rightWall || leftWall;
    const HitWallY = newPotantialY > this.maxY || newPotantialY < this.minY;


    // Gérer les rebonds en inversant la direction lorsque la balle atteint player 
    const hitGreenStickPosX = newPotentialX <= player.positionX -3;
    const hitGreenStickPosY = newPotantialY >= player.positionY && newPotantialY <= player.positionY + 25; // 25% de la taille de l'écran


    // Gérer les rebonds en inversant la direction lorsque la balle atteint otherPlayer
    const hitRedStickPosX = newPotentialX >= otherPlayer.positionX +3;
    const hitRedStickPosY = newPotantialY >= otherPlayer.positionY && newPotantialY <= otherPlayer.positionY + 25; // 25% de la taille de l'écran
    
    //position retenu au final
    const newX = HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newPotentialX;
    const newY = HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newPotantialY;

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
        if (currentPong.scoreUser1 >= 5 || currentPong.scoreUser2 >= 5)
        {
          this.stopPong();
          this.updateRankLevel(currentPong.winnerId);
          
        }
        const DataUpdatePong : UpdatePongInput = {
          ...currentPong
        }
        this.updatePong(DataUpdatePong);
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

