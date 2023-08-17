"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const pong_service_1 = require("./pong.service");
const pong_entity_1 = require("./entities/pong.entity");
const create_pong_input_1 = require("./dto/create-pong.input");
const update_pong_input_1 = require("./dto/update-pong.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const player_resolver_1 = require("./player/player.resolver");
const ball_resolver_1 = require("./ball/ball.resolver");
const pubSub = new graphql_subscriptions_1.PubSub();
const PONG_UPDATE_EVENT = 'PongUp';
let PongResolver = exports.PongResolver = class PongResolver {
    constructor(pongService, player, ball) {
        this.pongService = pongService;
        this.player = player;
        this.ball = ball;
        this.start = false;
        this.interval = null;
        this.maxX = 100;
        this.maxY = 100;
        this.minX = 0;
        this.minY = 0;
        this.speed = 5;
    }
    createPong(createPongInput) {
        return this.pongService.create(createPongInput);
    }
    findAll() {
        return this.pongService.findAll();
    }
    findUnique(id) {
        return this.pongService.findUnique(id);
    }
    findGame(userId) {
        return this.pongService.findGame(userId);
    }
    removePong(id) {
        return this.pongService.remove(id);
    }
    updatePong(updatePongInput) {
        const pongUp = this.pongService.update(updatePongInput.id, updatePongInput);
        pubSub.publish(PONG_UPDATE_EVENT, {
            pongUpdatedSubscription: pongUp,
        });
        return pongUp;
    }
    pongUpdatedSubscription(id) {
        return pubSub.asyncIterator(PONG_UPDATE_EVENT);
    }
    stopPong() {
        if (this.start && this.interval) {
            this.start = false;
            clearInterval(this.interval);
            this.interval = null;
            return true;
        }
        return false;
    }
    async startPong(id, playerId, otherPlayerId, pongId) {
        if (this.start === true) {
            return false;
        }
        this.start = true;
        setInterval(async () => {
            const currentPong = await this.findUnique(pongId);
            const ball = await this.ball.findUnique(id);
            const player = await this.player.findPlayer(playerId);
            const otherPlayer = await this.player.findPlayer(otherPlayerId);
            otherPlayer.positionX += 80;
            await this.ballMove(ball, player, otherPlayer, currentPong);
        }, 50);
        return true;
    }
    async ballMove(ball, player, otherPlayer, currentPong) {
        const newPotentialX = ball.positionX + (ball.directionX * this.speed) / 100;
        const newPontantialY = ball.positionY + (ball.directionY * this.speed) / 100;
        const rightWall = newPotentialX > this.maxX;
        const leftWall = newPotentialX < this.minX;
        const HitWallX = rightWall || leftWall;
        const HitWallY = newPontantialY > this.maxY || newPontantialY < this.minY;
        const hitGreenStickPosX = newPotentialX <= player.positionX - 3;
        const hitGreenStickPosY = newPontantialY >= player.positionY && newPontantialY <= player.positionY + 25;
        const hitRedStickPosX = newPotentialX >= otherPlayer.positionX + 3;
        const hitRedStickPosY = newPontantialY >= otherPlayer.positionY && newPontantialY <= otherPlayer.positionY + 25;
        const newX = HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newPotentialX;
        const newY = HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newPontantialY;
        if (HitWallX || HitWallY) {
            const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
            const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;
            if (HitWallX) {
                if (rightWall) {
                    currentPong.scoreUser1 += 1;
                    if (currentPong.scoreUser1 == 5) {
                        currentPong.winnerId = player.userId;
                        currentPong.loserId = otherPlayer.userId;
                    }
                }
                else {
                    currentPong.scoreUser2 += 1;
                    if (currentPong.scoreUser2 == 5) {
                        currentPong.winnerId = otherPlayer.userId;
                        currentPong.loserId = player.userId;
                    }
                }
                const DataUpdatePong = {
                    id: currentPong.id,
                    scoreUser1: currentPong.scoreUser1 + 1,
                    scoreUser2: currentPong.scoreUser2 + 1,
                    winnerId: currentPong.winnerId,
                    loserId: currentPong.loserId,
                };
                try {
                    const test = this.updatePong(DataUpdatePong);
                    console.log(test);
                }
                catch (error) {
                    console.log(error);
                }
                if (currentPong.scoreUser1 == 5 || currentPong.scoreUser2 == 5) {
                    this.stopPong();
                }
                const DataUpdateBall = {
                    id: ball.id,
                    positionX: 50,
                    positionY: 50,
                    directionX: Math.random() < 0.5 ? 20 : -10,
                    directionY: Math.random() < 0.5 ? 10 : -20,
                };
                this.ball.updateBall(DataUpdateBall);
            }
            else {
                const DataUpdateBall = {
                    id: ball.id,
                    positionX: newX,
                    positionY: newY,
                    directionX: newDirectionX,
                    directionY: newDirectionY,
                };
                this.ball.updateBall(DataUpdateBall);
            }
        }
        else if (hitGreenStickPosX && hitGreenStickPosY) {
            const newDirectionX = (hitGreenStickPosX && hitGreenStickPosY) ? -ball.directionX : ball.directionX;
            const DataUpdateBall = {
                id: ball.id,
                positionX: newX,
                positionY: newY,
                directionX: newDirectionX,
            };
            this.ball.updateBall(DataUpdateBall);
        }
        else if (hitRedStickPosX && hitRedStickPosY) {
            const newDirectionX = (hitRedStickPosX && hitRedStickPosY) ? -ball.directionX : ball.directionX;
            const DataUpdateBall = {
                id: ball.id,
                positionX: newX,
                positionY: newY,
                directionX: newDirectionX,
            };
            this.ball.updateBall(DataUpdateBall);
        }
        else {
            const DataUpdateBall = {
                id: ball.id,
                positionX: newX,
                positionY: newY,
            };
            this.ball.updateBall(DataUpdateBall);
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => pong_entity_1.Pong),
    __param(0, (0, graphql_1.Args)('createPongInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pong_input_1.CreatePongInput]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "createPong", null);
__decorate([
    (0, graphql_1.Query)(() => [pong_entity_1.Pong], { name: 'Pongs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => pong_entity_1.Pong, { name: 'Pong' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "findUnique", null);
__decorate([
    (0, graphql_1.Query)(() => pong_entity_1.Pong),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "findGame", null);
__decorate([
    (0, graphql_1.Mutation)(() => pong_entity_1.Pong),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "removePong", null);
__decorate([
    (0, graphql_1.Mutation)(() => pong_entity_1.Pong),
    __param(0, (0, graphql_1.Args)('updatePongInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_pong_input_1.UpdatePongInput]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "updatePong", null);
__decorate([
    (0, graphql_1.Subscription)(() => pong_entity_1.Pong, {
        filter: async (payload, variables) => {
            const resolvedPayload = await payload.pongUpdatedSubscription;
            return resolvedPayload.id === variables.id;
        }
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "pongUpdatedSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "stopPong", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('playerId', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('otherPlayerId', { type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('pongId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "startPong", null);
exports.PongResolver = PongResolver = __decorate([
    (0, graphql_1.Resolver)(() => pong_entity_1.Pong),
    __metadata("design:paramtypes", [pong_service_1.PongService,
        player_resolver_1.PlayerResolver,
        ball_resolver_1.BallResolver])
], PongResolver);
//# sourceMappingURL=pong.resolver.js.map