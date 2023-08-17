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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const player_resolver_1 = require("./player/player.resolver");
const ball_resolver_1 = require("./ball/ball.resolver");
const waiting_room_resolver_1 = require("./waiting-room/waiting-room.resolver");
let PongService = exports.PongService = class PongService {
    constructor(prisma, player, ball, waitingRoom) {
        this.prisma = prisma;
        this.player = player;
        this.ball = ball;
        this.waitingRoom = waitingRoom;
    }
    async create(createPongInput) {
        return this.prisma.$transaction(async (prisma) => {
            const { playerId1, playerId2 } = createPongInput, dataWithoutPlayerIds = __rest(createPongInput, ["playerId1", "playerId2"]);
            const pong = await prisma.pong.create({
                data: dataWithoutPlayerIds
            });
            const newWaitingRoom = await this.waitingRoom.createWaitingRoom();
            const newBall = await this.ball.createBall();
            const playerData = {
                id: createPongInput.userId1,
                host: true,
                opponentPlayerId: playerId2,
                waitingRoomId: newWaitingRoom.id,
                ballId: newBall.id,
                pongId: pong.id,
            };
            this.player.updatePlayer(playerData);
            const otherPlayerData = {
                id: createPongInput.userId2,
                opponentPlayerId: playerId1,
                waitingRoomId: newWaitingRoom.id,
                ballId: newBall.id,
                pongId: pong.id,
            };
            this.player.updatePlayer(otherPlayerData);
            return pong;
        });
    }
    findAll() {
        return this.prisma.pong.findMany({});
    }
    findUnique(id) {
        return this.prisma.pong.findUnique({ where: { id } });
    }
    async findGame(userId) {
        try {
            const games = await this.prisma.pong.findMany({
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
            if (games.length === 0) {
                throw new Error('No game found for the given userId.');
            }
            return games[0];
        }
        catch (error) {
            throw new Error(`Error fetching game: ${error.message}`);
        }
    }
    update(id, updatePongInput) {
        return `This action updates a #${id} pong`;
    }
    remove(id) {
        return `This action removes a #${id} pong`;
    }
};
exports.PongService = PongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        player_resolver_1.PlayerResolver,
        ball_resolver_1.BallResolver,
        waiting_room_resolver_1.WaitingRoomResolver])
], PongService);
//# sourceMappingURL=pong.service.js.map