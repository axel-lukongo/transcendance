import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { BallService } from './ball.service';
import { Ball } from './entities/ball.entity';
import { UpdateBallInput } from './dto/update-ball.input';
import { PubSub } from 'graphql-subscriptions';
import { PlayerResolver } from '../player/player.resolver';
import { Player } from '../player/entities/player.entity';

const pubSub = new PubSub();
const BALL_UPDATE_EVENT = 'ballUp';

@Resolver(() => Ball)
export class BallResolver {

  private start : boolean;
  private  interval : NodeJS.Timer | null;

  // Vérifier les limites de l'environnement pour gérer les rebonds
  private maxX: number;  // Valeur maximale de la coordonnée X (par exemple, 100%)
  private maxY: number;  // Valeur maximale de la coordonnée Y (par exemple, 100%)
  private minX: number;  // Valeur minimale de la coordonnée X (par exemple, 0%)
  private minY: number;  // Valeur minimale de la coordonnée Y (par exemple, 0%)  

  // vitesse de deplacement en %
  private speed: number;  

  constructor(private readonly ballService: BallService,
              private readonly player : PlayerResolver) {
              this.start = false;
              this.maxX = 100;
              this.maxY = 100;
              this.minX = 0;
              this.minY = 0;
              this.speed = 5;
              }

  @Mutation(() => Ball)
  createBall() {
    return this.ballService.create();
  }

  @Query(() => [Ball], { name: 'Ball' })
  findAll() {
    return this.ballService.findAll();
  }

  @Query(() => Ball, { name: 'Balls' })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.ballService.findUnique(id);
  }
  
  @Mutation(() => Ball)
  removeBall(@Args('id', { type: () => Int }) id: number) {
    return this.ballService.remove(id);
  }

  @Mutation(() => Ball)
  updateBall(@Args('updateBallInput') updateBallInput: UpdateBallInput) {
    const ballUp = this.ballService.update(updateBallInput.id, updateBallInput);

    pubSub.publish(BALL_UPDATE_EVENT, {
      ballUpdatedSubscription: ballUp,
    });
    return ballUp;
  }
  @Subscription(() => Ball, {
    filter: async (payload, variables) => {
      const resolvedPayload = await payload.ballUpdatedSubscription;
      return resolvedPayload.id === variables.id;
    }
  })
  ballUpdatedSubscription(@Args('id', { type: () => Int }) id: number){
    return pubSub.asyncIterator(BALL_UPDATE_EVENT);
  }

  @Mutation(() => Boolean)
  stopBallMove() {
    if (this.start && this.interval) {
      this.start = false;
      clearInterval(this.interval);
      this.interval = null;
      return true;
    }

    return false; // Renvoyer false si l'appel périodique n'était pas en cours
  }

  @Mutation(() => Boolean)
  async startBallMove(  @Args('id', { type: () => Int }) id: number,
                        @Args('playerId', { type: () => Int }) playerId: number,
                        @Args('otherPlayerId', { type: () => Int }) otherPlayerId: number) 
  {

    if (this.start === true) {
      return false;
    }
    this.start = true;

    
    setInterval(async () => {
      const ball  = await this.findUnique(id);
        
      const player = await this.player.findPlayer(playerId);
        
      const otherPlayer = await this.player.findPlayer(otherPlayerId);
      otherPlayer.positionX += 80;
      await this.ballMove(ball, player, otherPlayer);
    }, 80);
    return true;

  }

  private async  ballMove(  ball: Ball, player: Player,otherPlayer: Player) {

    const newPotentialX = ball.positionX + (ball.directionX * this.speed) /100;
    const newPontantialY = ball.positionY + (ball.directionY * this.speed) /100;
  
    // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
    const HitWallX = newPotentialX > this.maxX || newPotentialX < this.minX;
    const HitWallY = newPontantialY > this.maxY || newPontantialY < this.minY;

    // Gérer les rebonds en inversant la direction lorsque la balle atteint player 
    const hitGreenStickPosX = newPotentialX <= player.positionX -5;
    const hitGreenStickPosY = newPontantialY >= player.positionY && newPontantialY <= player.positionY + 25; // 25% de la taille de l'écran
    
    // Gérer les rebonds en inversant la direction lorsque la balle atteint otherPlayer
    const hitRedStickPosX = newPotentialX >= otherPlayer.positionX + 4
    const hitRedStickPosY = newPontantialY >= otherPlayer.positionY && newPontantialY <= otherPlayer.positionY + 25; // 25% de la taille de l'écran
    
    //position retenu au final
    const newX = HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newPotentialX;
    const newY = HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newPontantialY;

    //TOUCH A WALL
    if (HitWallX || HitWallY) { 
      const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
      const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
        directionY : newDirectionY,
      }

      this.updateBall(DataUpdateBall);
    }
    // TOUCH THE PLAYER 
    else if (hitGreenStickPosX && hitGreenStickPosY) {
      const newDirectionX = (hitGreenStickPosX && hitGreenStickPosY) ? -ball.directionX : ball.directionX;
      
      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      this.updateBall(DataUpdateBall);
    }
    //TOUCH THE OTHER PLAYER
    else if (hitRedStickPosX && hitRedStickPosY) {
      const newDirectionX = (hitRedStickPosX && hitRedStickPosY) ? -ball.directionX : ball.directionX;

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      this.updateBall(DataUpdateBall);
    }
    //TOUCH ANYTHING BUT UPDATE THE BALL POSITION
    else {
      
      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
      }
      const updateball = this.updateBall(DataUpdateBall);
    }
  }
}
