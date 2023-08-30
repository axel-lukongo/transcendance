import { Resolver, Query, Mutation, Args, Int, Subscription, Context, ObjectType, Field, Float } from '@nestjs/graphql';
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
import { WaitingRoomResolver } from './waiting-room/waiting-room.resolver';
import { UpdatePlayerInput } from './player/dto/update-player.input';
import { Injectable } from '@nestjs/common';
import { PongInviteResolver } from './pong-invite/pong-invite.resolver';
import { __CONNECTED__, __IN_GAME__ } from 'src/authentication/authentication.service';

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

@ObjectType()
export class StatisticMatch{
  @Field(() => Int)
  grade: number;
  
  @Field(() => String)
  nickname: string;

  @Field(() => Int)
  level: number;

  @Field(() => String)
  rank: string;

  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  defeats: number;

  @Field(() => Float)
  ratio: number;

}

Injectable()
export class TimerService {
  private timers: Record<number, NodeJS.Timer> = {};

  startPongTimer(pongId: number, callback: () => void) {
    if (this.timers[pongId]) {
      clearInterval(this.timers[pongId]);
    }

    const timer = setInterval(callback, 50);
    this.timers[pongId] = timer;
  }

  stopPongTimer(pongId: number) {
    if (this.timers[pongId]) {
      clearInterval(this.timers[pongId]);
      delete this.timers[pongId];
    }
  }
}

@Resolver(() => Pong)
export class PongResolver {


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
              private readonly user: UsersResolver,
              private readonly pongInvite: PongInviteResolver,
              private readonly timer: TimerService,) {
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
  myMatchHistory(@Context() context : any) {
    return this.pongService.myMatchHistory(context.req.userId);
  }


  @Query(() => StatisticMatch)
  async myMatchStatistic(@Context() context : any) {
    return this.pongService.myMatchStatistic(context.req.userId)
  }

  @Query(() => [StatisticMatch])
  async leaderBoard() {
    return this.pongService.leaderBoard();
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
    // console.log(updatedUser);
  }

  @Mutation(() => JoinPongResponse)
  async joinPongInvite( @Args('friendId', { type: () => Int }) friendId: number,
                        @Args('waitingRoomId', { type: () => Int }) waitingRoomId: number,
                        @Context() context : any) {
    
    let player = await this.player.setPlayer(context.req.userId, waitingRoomId);
                          
    const listPlayers = await this.player.findAllPlayersInWaitingRoom(waitingRoomId);
    
    if (listPlayers.length > 1) {

      const createPongInput: CreatePongInput = {
        userId1: listPlayers[0].userId,
        userId2: listPlayers[1].userId,
      };
      const pong = await this.createPong(createPongInput);
      
      
      //Nouvelle instance d'un balle pour le Pong 
      const ball = await this.ball.createBall();
      
      const playerData : UpdatePlayerInput ={
        id : listPlayers[1].id,
        opponentPlayerId: listPlayers[0].id,
        host : false,
        positionX : 90,
        ballId: ball.id,
        pongId: pong.id,
      }
      player = await this.player.updatePlayer(playerData);
      
      const otherPlayerData : UpdatePlayerInput ={
        id : listPlayers[0].id,
        opponentPlayerId: listPlayers[1].id,
        host : true,
        ballId: ball.id,
        pongId: pong.id,
      }
      const otherPlayer = await this.player.updatePlayer(otherPlayerData);
      this.user.updateState(__IN_GAME__, context);

      return { player, ball, otherPlayer, pong };
    }
    else
    {
      return new Promise<JoinPongResponse>(resolve => {
        const interval = setInterval(async () => {
          player = await this.player.findPlayer(player.id);
          if (!player) {
            clearInterval(interval);
            resolve({player : null, });
          }
          else if (player.opponentPlayerId !== 0) {
            clearInterval(interval); // Arrêter l'intervalle
            const otherPlayer = await this.player.findPlayer(player.opponentPlayerId);
            const ball = await this.ball.findUnique(player.ballId);
            const pong = await this.findPong(player.pongId);
            this.user.updateState(__IN_GAME__, context);
            resolve({ player , ball, otherPlayer , pong });
          }
        }, 1000);
      });
    }
  }

  @Mutation(() => JoinPongResponse)
  async joinPong( @Args('userId', { type: () => Int }) userId: number, @Context() context: any) {

    let player = await this.player.setPlayer(userId, 1);
    if (!player)
    {
      return { player: null };
    }
    
    if (player.waitingRoomId != 1) {
      const pong_tmp = await this.findPong(player.pongId);
      if (pong_tmp && pong_tmp.winnerId)
      {
        await this.endPong(player.userId, context);
        player = await this.player.setPlayer(userId, 1);
      }
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

      this.user.updateState(__IN_GAME__, context);

      return { player, ball, otherPlayer, pong };
    }
    else {
      return new Promise<JoinPongResponse>(resolve => {
        const interval = setInterval(async () => {
          player = await this.player.findPlayer(player.id);
          if (!player) {
            clearInterval(interval);
            resolve({player : null, });
          }
          else if (player.opponentPlayerId !== 0) {
            clearInterval(interval); // Arrêter l'intervalle
            const otherPlayer = await this.player.findPlayer(player.opponentPlayerId);
            const ball = await this.ball.findUnique(player.ballId);
            const pong = await this.findPong(player.pongId);

            this.user.updateState(__IN_GAME__, context);

            resolve({ player , ball, otherPlayer , pong });
          }
        }, 1000);
      });
    } 
  }


  @Mutation(() => String)
  async endPong( @Args('userId', { type: () => Int }) userId: number, @Context() context : any): Promise<string> {
    
    const player = await this.player.findPlayerByUserId(userId);
    if (!player) {
      return 'Pong ended';
    }
    else if (player.pongId)
    {
      if (player.host)
      {
        await this.ball.removeBall(player.ballId);
        const invite = await this.pongInvite.findPongInviteByWaitingRoomId(player.waitingRoomId);
        if (invite)
        {
          await this.pongInvite.removePongInvite(invite.id);
        }
        this.waitingRoom.removeWaitingRoom(player.waitingRoomId);
      }
      const pong = await this.findPong(player.pongId);
      if (!pong.winnerId)
      {
        const winnerId = player.host ? pong.userId2 : pong.userId1;
        const loserId = player.host ? pong.userId1 : pong.userId2;
        const updateDataPong: UpdatePongInput = {
          id: player.pongId,
          scoreUser1: player.host ? 0 : 5,
          scoreUser2: player.host ? 5 : 0,
          winnerId: winnerId,
          loserId: loserId,
          start: false
        };
        await this.updateRankLevel(winnerId);
        await this.updatePong(updateDataPong);
      }
    }
    await this.player.removePlayer(player.id);
    
    this.user.updateState(__CONNECTED__, context);
    return 'Pong ended';
  }

  @Mutation(() => Boolean)
  async startPong(  @Args('ballId', { type: () => Int }) ballId: number,
                        @Args('playerId', { type: () => Int }) playerId: number,
                        @Args('otherPlayerId', { type: () => Int }) otherPlayerId: number,
                        @Args('pongId', { type: () => Int }) pongId: number) {


    const pong = await this.findPong(pongId);
    if (pong.start === true) {
      return false;
    }
    const updateDataPong : UpdatePongInput = {
      id: pong.id,
      start: true
    }
    await this.updatePong(updateDataPong);

    const callback = async () => {
      const currentPong = await this.findPong(pongId);
      const ball  = await this.ball.findUnique(ballId);
      const player = await this.player.findPlayer(playerId);
      const otherPlayer = await this.player.findPlayer(otherPlayerId);
      if (currentPong.start === false || !ball || !player || !otherPlayer) {
        this.timer.stopPongTimer(pongId);
        return true;
      }
      await this.ballMove(ball, player, otherPlayer, currentPong);
    }
    this.timer.startPongTimer(pongId, callback);

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
            currentPong.winnerId = currentPong.userId1;
            currentPong.loserId = currentPong.userId2;
          }
        }
        else
        {
          currentPong.scoreUser2 += 1;
          if (currentPong.scoreUser2 == 5)
          {
            currentPong.winnerId = currentPong.userId2;
            currentPong.loserId = currentPong.userId1;
          }
        }
        if (currentPong.scoreUser1 == 5 || currentPong.scoreUser2 == 5)
        {
          currentPong.start = false; // STOP A SPECIFIC GAME
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

