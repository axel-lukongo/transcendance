import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PongService } from './pong.service';
import { Pong } from './entities/pong.entity';
import { CreatePongInput } from './dto/create-pong.input';
import { UpdatePongInput } from './dto/update-pong.input';
import { PubSub } from 'graphql-subscriptions';
import { pubsub } from 'googleapis/build/src/apis/pubsub';
import { PlayerResolver } from './player/player.resolver';
import { BallResolver } from './ball/ball.resolver';
import { Ball } from './ball/entities/ball.entity';
import { Player } from './player/entities/player.entity';
import { UpdateBallInput } from './ball/dto/update-ball.input';

const pubSub = new PubSub();
const PONG_UPDATE_EVENT = 'PongUp';

@Resolver(() => Pong)
export class PongResolver {

  private start : boolean;
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
              private readonly ball: BallResolver) {
                this.start = false;
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

  @Query(() => [Pong], { name: 'Pongs' })
  findAll() {
    return this.pongService.findAll();
  }

  @Query(() => Pong, { name: 'Pong' })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.pongService.findUnique(id);
  }


  @Query(() => Pong, )
  findGame(@Args('userId', { type: () => Int }) userId: number) {
    return this.pongService.findGame(userId);
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
  pongUpdatedSubscription(@Args('id', { type: () => Int }) id: number){
    return pubSub.asyncIterator(PONG_UPDATE_EVENT);
  }

  @Mutation(() => Boolean)
  stopPong() {
    if (this.start && this.interval) {
      this.start = false;
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

    if (this.start === true) {
      return false;
    }
    this.start = true;
    
    setInterval(async () => {

      const currentPong = await this.findUnique(pongId);

      const ball  = await this.ball.findUnique(id);
  
      const player = await this.player.findPlayer(playerId);

      const otherPlayer = await this.player.findPlayer(otherPlayerId);
      otherPlayer.positionX += 80;
      await this.ballMove(ball, player, otherPlayer, currentPong);
    }, 50);

    return true;
  }

  private async  ballMove(  ball: Ball, player: Player, otherPlayer: Player, currentPong: Pong) {

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
          if (currentPong.scoreUser1 == 10000)
          {
            currentPong.winnerId = player.userId;
            currentPong.loserId = otherPlayer.userId;
          }
        }
        else
        {
          currentPong.scoreUser2 += 1;
          if (currentPong.scoreUser2 == 10000)
          {
            currentPong.winnerId = otherPlayer.userId;
            currentPong.loserId = player.userId;
          }
        }
        const DataUpdatePong : UpdatePongInput = {
          ...currentPong
        }
          this.updatePong(DataUpdatePong);
        if (currentPong.scoreUser1 == 5 || currentPong.scoreUser2 == 5)
        {
          console.log('final');
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
