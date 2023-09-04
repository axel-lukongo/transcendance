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
exports.PongResolver = exports.TimerService = exports.StatisticMatch = exports.JoinPongResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const pong_service_1 = require("./pong.service");
const pong_entity_1 = require("./entities/pong.entity");
const create_pong_input_1 = require("./dto/create-pong.input");
const update_pong_input_1 = require("./dto/update-pong.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const player_resolver_1 = require("./player/player.resolver");
const ball_resolver_1 = require("./ball/ball.resolver");
const ball_entity_1 = require("./ball/entities/ball.entity");
const player_entity_1 = require("./player/entities/player.entity");
const users_resolver_1 = require("../users/users.resolver");
const waiting_room_resolver_1 = require("./waiting-room/waiting-room.resolver");
const common_1 = require("@nestjs/common");
const pong_invite_resolver_1 = require("./pong-invite/pong-invite.resolver");
const authentication_service_1 = require("../authentication/authentication.service");
const pubSub = new graphql_subscriptions_1.PubSub();
const PONG_UPDATE_EVENT = 'PongUp';
let JoinPongResponse = exports.JoinPongResponse = class JoinPongResponse {
};
__decorate([
    (0, graphql_1.Field)(() => player_entity_1.Player, { nullable: true }),
    __metadata("design:type", player_entity_1.Player)
], JoinPongResponse.prototype, "player", void 0);
__decorate([
    (0, graphql_1.Field)(() => player_entity_1.Player, { nullable: true }),
    __metadata("design:type", player_entity_1.Player)
], JoinPongResponse.prototype, "otherPlayer", void 0);
__decorate([
    (0, graphql_1.Field)(() => ball_entity_1.Ball, { nullable: true }),
    __metadata("design:type", ball_entity_1.Ball)
], JoinPongResponse.prototype, "ball", void 0);
__decorate([
    (0, graphql_1.Field)(() => pong_entity_1.Pong, { nullable: true }),
    __metadata("design:type", pong_entity_1.Pong)
], JoinPongResponse.prototype, "pong", void 0);
exports.JoinPongResponse = JoinPongResponse = __decorate([
    (0, graphql_1.ObjectType)()
], JoinPongResponse);
let StatisticMatch = exports.StatisticMatch = class StatisticMatch {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatisticMatch.prototype, "grade", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StatisticMatch.prototype, "nickname", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatisticMatch.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StatisticMatch.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatisticMatch.prototype, "wins", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], StatisticMatch.prototype, "defeats", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], StatisticMatch.prototype, "ratio", void 0);
exports.StatisticMatch = StatisticMatch = __decorate([
    (0, graphql_1.ObjectType)()
], StatisticMatch);
(0, common_1.Injectable)();
class TimerService {
    constructor() {
        this.timers = {};
    }
    startPongTimer(pongId, callback) {
        if (this.timers[pongId]) {
            clearInterval(this.timers[pongId]);
        }
        const timer = setInterval(callback, 50);
        this.timers[pongId] = timer;
    }
    stopPongTimer(pongId) {
        if (this.timers[pongId]) {
            clearInterval(this.timers[pongId]);
            delete this.timers[pongId];
        }
    }
}
exports.TimerService = TimerService;
let PongResolver = exports.PongResolver = class PongResolver {
    constructor(pongService, player, ball, waitingRoom, user, pongInvite, timer) {
        this.pongService = pongService;
        this.player = player;
        this.ball = ball;
        this.waitingRoom = waitingRoom;
        this.user = user;
        this.pongInvite = pongInvite;
        this.timer = timer;
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
    findPong(id) {
        return this.pongService.findUnique(id);
    }
    myMatchHistory(context) {
        return this.pongService.myMatchHistory(context.req.userId);
    }
    async myMatchStatistic(context) {
        return this.pongService.myMatchStatistic(context.req.userId);
    }
    async leaderBoard() {
        return this.pongService.leaderBoard();
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
    pongUpdatedSubscription(context, id) {
        return pubSub.asyncIterator(PONG_UPDATE_EVENT);
    }
    async updateRankLevel(id) {
        let Rank;
        (function (Rank) {
            Rank["Bronze"] = "Bronze";
            Rank["Silver"] = "Silver";
            Rank["Gold"] = "Gold";
        })(Rank || (Rank = {}));
        const levelRanges = {
            [Rank.Bronze]: { min: 1, max: 9, xpGain: 2 },
            [Rank.Silver]: { min: 10, max: 19, xpGain: 1 },
            [Rank.Gold]: { min: 20, max: 30, xpGain: 0.5 },
        };
        const getNextRank = (rank) => {
            if (rank === Rank.Bronze) {
                return Rank.Silver;
            }
            else if (rank === Rank.Silver) {
                return Rank.Gold;
            }
            else {
                return null;
            }
        };
        const getRank = (rank) => {
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
        const dataUpdateUser = {
            id: user.id,
            level: user.level + xpGain,
            rank: totalXpPercentage === 100 ? nextRank === null || nextRank === void 0 ? void 0 : nextRank.toString() : rank === null || rank === void 0 ? void 0 : rank.toString(),
        };
        const updatedUser = await this.user.updateUser(dataUpdateUser);
    }
    async joinPongInvite(friendId, waitingRoomId, context) {
        let player = await this.player.setPlayer(context.req.userId, waitingRoomId);
        await this.user.updateState(authentication_service_1.__IN_GAME__, context);
        const listPlayers = await this.player.findAllPlayersInWaitingRoom(waitingRoomId);
        if (listPlayers.length > 1) {
            const createPongInput = {
                userId1: listPlayers[0].userId,
                userId2: listPlayers[1].userId,
            };
            const pong = await this.createPong(createPongInput);
            const ball = await this.ball.createBall();
            const playerData = {
                id: listPlayers[1].id,
                opponentPlayerId: listPlayers[0].id,
                host: false,
                positionX: 90,
                ballId: ball.id,
                pongId: pong.id,
            };
            player = await this.player.updatePlayer(playerData);
            const otherPlayerData = {
                id: listPlayers[0].id,
                opponentPlayerId: listPlayers[1].id,
                host: true,
                ballId: ball.id,
                pongId: pong.id,
            };
            const otherPlayer = await this.player.updatePlayer(otherPlayerData);
            return { player, ball, otherPlayer, pong };
        }
        else {
            return new Promise(resolve => {
                const interval = setInterval(async () => {
                    player = await this.player.findPlayer(player.id);
                    if (!player) {
                        clearInterval(interval);
                        resolve({ player: null, });
                    }
                    else if (player.opponentPlayerId !== 0) {
                        clearInterval(interval);
                        const otherPlayer = await this.player.findPlayer(player.opponentPlayerId);
                        const ball = await this.ball.findUnique(player.ballId);
                        const pong = await this.findPong(player.pongId);
                        resolve({ player, ball, otherPlayer, pong });
                    }
                }, 1000);
            });
        }
    }
    async joinPong(userId, context) {
        await this.user.updateState(authentication_service_1.__IN_GAME__, context);
        let player = await this.player.setPlayer(userId, 1);
        if (!player) {
            return { player: null };
        }
        if (player.waitingRoomId != 1) {
            const pong_tmp = await this.findPong(player.pongId);
            if (pong_tmp && pong_tmp.winnerId) {
                await this.endPong(player.userId, context);
                player = await this.player.setPlayer(userId, 1);
            }
        }
        const listPlayers = await this.player.findAllPlayersInWaitingRoom(1);
        if (listPlayers.length > 1) {
            const createPongInput = {
                userId1: listPlayers[0].userId,
                userId2: listPlayers[1].userId,
            };
            const pong = await this.createPong(createPongInput);
            const newWaitingRoom = await this.waitingRoom.createWaitingRoom();
            const ball = await this.ball.createBall();
            const playerData = {
                id: listPlayers[1].id,
                opponentPlayerId: listPlayers[0].id,
                host: false,
                waitingRoomId: newWaitingRoom.id,
                positionX: 90,
                ballId: ball.id,
                pongId: pong.id,
            };
            player = await this.player.updatePlayer(playerData);
            const otherPlayerData = {
                id: listPlayers[0].id,
                opponentPlayerId: listPlayers[1].id,
                host: true,
                waitingRoomId: newWaitingRoom.id,
                ballId: ball.id,
                pongId: pong.id,
            };
            const otherPlayer = await this.player.updatePlayer(otherPlayerData);
            return { player, ball, otherPlayer, pong };
        }
        else {
            return new Promise(resolve => {
                const interval = setInterval(async () => {
                    player = await this.player.findPlayer(player.id);
                    if (!player) {
                        clearInterval(interval);
                        resolve({ player: null, });
                    }
                    else if (player.opponentPlayerId !== 0) {
                        clearInterval(interval);
                        const otherPlayer = await this.player.findPlayer(player.opponentPlayerId);
                        const ball = await this.ball.findUnique(player.ballId);
                        const pong = await this.findPong(player.pongId);
                        resolve({ player, ball, otherPlayer, pong });
                    }
                }, 1000);
            });
        }
    }
    async endPong(userId, context) {
        const player = await this.player.findPlayerByUserId(userId);
        if (!player) {
            return 'Pong ended';
        }
        else if (player.pongId) {
            if (player.host) {
                await this.ball.removeBall(player.ballId);
                const invite = await this.pongInvite.findPongInviteByWaitingRoomId(player.waitingRoomId);
                if (invite) {
                    await this.pongInvite.removePongInvite(invite.id);
                }
                this.waitingRoom.removeWaitingRoom(player.waitingRoomId);
            }
            const pong = await this.findPong(player.pongId);
            if (!pong.winnerId) {
                const winnerId = player.host ? pong.userId2 : pong.userId1;
                const loserId = player.host ? pong.userId1 : pong.userId2;
                const updateDataPong = {
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
        return 'Pong ended';
    }
    async startPong(ballId, playerId, otherPlayerId, pongId) {
        const pong = await this.findPong(pongId);
        if (pong.start === true) {
            return false;
        }
        const updateDataPong = {
            id: pong.id,
            start: true
        };
        await this.updatePong(updateDataPong);
        const callback = async () => {
            const currentPong = await this.findPong(pongId);
            const ball = await this.ball.findUnique(ballId);
            const player = await this.player.findPlayer(playerId);
            const otherPlayer = await this.player.findPlayer(otherPlayerId);
            if (currentPong.start === false || !ball || !player || !otherPlayer) {
                this.timer.stopPongTimer(pongId);
                return true;
            }
            await this.ballMove(ball, player, otherPlayer, currentPong);
        };
        this.timer.startPongTimer(pongId, callback);
        return true;
    }
    async ballMove(ball, player, otherPlayer, currentPong) {
        const newPotentialX = ball.positionX + (ball.directionX * this.speed) / 100;
        const newPotantialY = ball.positionY + (ball.directionY * this.speed) / 100;
        const rightWall = newPotentialX > this.maxX;
        const leftWall = newPotentialX < this.minX;
        const HitWallX = rightWall || leftWall;
        const HitWallY = newPotantialY > this.maxY || newPotantialY < this.minY;
        const hitGreenStickPosX = newPotentialX <= player.positionX - 3;
        const hitGreenStickPosY = newPotantialY >= player.positionY && newPotantialY <= player.positionY + 25;
        const hitRedStickPosX = newPotentialX >= otherPlayer.positionX + 3;
        const hitRedStickPosY = newPotantialY >= otherPlayer.positionY && newPotantialY <= otherPlayer.positionY + 25;
        const newX = HitWallX || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionX : newPotentialX;
        const newY = HitWallY || (hitGreenStickPosX && hitGreenStickPosY) || (hitRedStickPosX && hitRedStickPosY) ? ball.positionY : newPotantialY;
        if (HitWallX || HitWallY) {
            const newDirectionX = HitWallX ? -ball.directionX : ball.directionX;
            const newDirectionY = HitWallY ? -ball.directionY : ball.directionY;
            if (HitWallX) {
                if (rightWall) {
                    currentPong.scoreUser1 += 1;
                    if (currentPong.scoreUser1 == 5) {
                        currentPong.winnerId = currentPong.userId1;
                        currentPong.loserId = currentPong.userId2;
                    }
                }
                else {
                    currentPong.scoreUser2 += 1;
                    if (currentPong.scoreUser2 == 5) {
                        currentPong.winnerId = currentPong.userId2;
                        currentPong.loserId = currentPong.userId1;
                    }
                }
                if (currentPong.scoreUser1 == 5 || currentPong.scoreUser2 == 5) {
                    currentPong.start = false;
                    this.updateRankLevel(currentPong.winnerId);
                }
                const DataUpdatePong = Object.assign({}, currentPong);
                this.updatePong(DataUpdatePong);
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
    (0, graphql_1.Query)(() => [pong_entity_1.Pong], { name: 'findPongs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => pong_entity_1.Pong, { name: 'findPong' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "findPong", null);
__decorate([
    (0, graphql_1.Query)(() => [pong_entity_1.Pong]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "myMatchHistory", null);
__decorate([
    (0, graphql_1.Query)(() => StatisticMatch),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "myMatchStatistic", null);
__decorate([
    (0, graphql_1.Query)(() => [StatisticMatch]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "leaderBoard", null);
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
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], PongResolver.prototype, "pongUpdatedSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => JoinPongResponse),
    __param(0, (0, graphql_1.Args)('friendId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('waitingRoomId', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "joinPongInvite", null);
__decorate([
    (0, graphql_1.Mutation)(() => JoinPongResponse),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "joinPong", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PongResolver.prototype, "endPong", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('ballId', { type: () => graphql_1.Int })),
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
        ball_resolver_1.BallResolver,
        waiting_room_resolver_1.WaitingRoomResolver,
        users_resolver_1.UsersResolver,
        pong_invite_resolver_1.PongInviteResolver,
        TimerService])
], PongResolver);
//# sourceMappingURL=pong.resolver.js.map