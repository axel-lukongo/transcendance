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
  constructor(private readonly ballService: BallService,
              private readonly player : PlayerResolver) {}

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


  @Mutation(() => Ball)
  async ballMove( @Args('id', { type: () => Int }) id: number,
                  @Args('playerId', { type: () => Int }) playerId: number,
                  @Args('otherPlayerId', { type: () => Int }) otherPlayerId: number) {

    // Vérifier les limites de l'environnement pour gérer les rebonds
    const maxX = 100; // Valeur maximale de la coordonnée X (par exemple, 100%)
    const maxY = 100; // Valeur maximale de la coordonnée Y (par exemple, 100%)
    const minX = 0; // Valeur minimale de la coordonnée X (par exemple, 0%)
    const minY = 0; // Valeur minimale de la coordonnée Y (par exemple, 0%)  
    
    const speed = 1 ; // vitesse de deplacement en %
    
    const ball  = await this.findUnique(id);
    const player = await this.player.findPlayer(playerId);
    const otherPlayer = await this.player.findPlayer(otherPlayerId);
  
    console.log('current ball directionX: ' , ball.directionX);
    console.log('current ball directionY: ' , ball.directionY);
    const newPotentialX = ball.positionX + (ball.directionX * speed) /100;
    const newPontantialY = ball.positionY + (ball.directionY * speed) /100;
      
    // Gérer les rebonds en inversant la direction lorsque la balle atteint les bords
    const HitWallX = newPotentialX > maxX || newPotentialX < minX;
    const HitWallY = newPontantialY > maxY || newPontantialY < minY;
    
    // Gérer les rebonds en inversant la direction lorsque la balle atteint player 
    const hitGreenStickPosX = newPotentialX <= player.positionX -5;
    const hitGreenStickPosY = newPontantialY >= player.positionY && newPontantialY <= player.positionY + 25; // 25% de la taille de l'écran
    
    // Gérer les rebonds en inversant la direction lorsque la balle atteint otherPlayer
    const hitRedStickPosX = newPotentialX >= otherPlayer.positionX + 4
    const hitRedStickPosY = newPontantialY >= otherPlayer.positionY && newPontantialY <= otherPlayer.positionY + 25; // 25% de la taille de l'écran
    
    //position retenu au final
    const newX=  HitWallX || (hitGreenStickPosX && hitGreenStickPosY) /*|| (hitRedStickPosX && hitRedStickPosY)*/ ? ball.positionX : newPotentialX;
    const newY=  HitWallY || (hitGreenStickPosX && hitGreenStickPosY) /*|| (hitRedStickPosX && hitRedStickPosY)*/ ? ball.positionY : newPontantialY;
      
    //TOUCH A WALL
    if (HitWallX || HitWallY) { 
      const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
      const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;
      console.log('wall was hit new dirX: ', newDirectionX);
      console.log('wall was hit new dirY: ', newDirectionY);

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
        directionY : newDirectionY,
      }

      return  this.updateBall(DataUpdateBall);
    }
    // TOUCH THE PLAYER 
    else if (hitGreenStickPosX && hitGreenStickPosY) {
      const newDirectionX = (hitGreenStickPosX && hitGreenStickPosY) ? -ball.directionX : ball.directionX;
      console.log('player was hit, new dirX: ', newDirectionX);

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      return this.updateBall(DataUpdateBall);
    }
    //TOUCH THE OTHER PLAYER
    else if (hitRedStickPosX && hitRedStickPosY) {
      const newDirectionX = (hitRedStickPosX && hitRedStickPosY) ? -ball.directionX : ball.directionX;
      console.log('other player was hit, new dirX: ', newDirectionX);

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
        directionX : newDirectionX,
      }

      return this.updateBall(DataUpdateBall);
    }
    //TOUCH ANYTHING BUT UPDATE THE BALL POSITION
    else {
      console.log('no hit dirX: ', ball.directionX);
      console.log('no hit dirY: ', ball.directionY);

      const DataUpdateBall : UpdateBallInput = {
        ...ball,
        positionX : newX,
        positionY : newY,
      }

      return this.updateBall(DataUpdateBall);
    }
    // await new Promise((resolve) => setTimeout(resolve, 50));  
  }
}
