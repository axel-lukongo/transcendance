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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongInviteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PongInviteService = exports.PongInviteService = class PongInviteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async setPongInvite(userId, friendId) {
        let pongInvite = await this.findPongInvite(userId, friendId);
        if (!pongInvite) {
            const newRoom = await this.prisma.waitingRoom.create({});
            const createPongInviteInput = {
                userId1: userId,
                userId2: friendId,
                waitingRoomId: newRoom.id
            };
            return await this.create(createPongInviteInput);
        }
        return pongInvite;
    }
    async create(createPongInviteInput) {
        return this.prisma.pongInvite.create({
            data: createPongInviteInput
        });
    }
    async findPongInvite(userId, friendId) {
        return this.prisma.pongInvite.findFirst({
            where: {
                OR: [
                    { userId1: userId, userId2: friendId },
                    { userId1: friendId, userId2: userId },
                ],
            },
        });
    }
    findPongInviteByWaitingRoomId(waitingRoomId) {
        return this.prisma.pongInvite.findUnique({
            where: {
                waitingRoomId: waitingRoomId
            },
        });
    }
    remove(id) {
        return this.prisma.pongInvite.delete({
            where: { id: id },
        });
    }
};
exports.PongInviteService = PongInviteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PongInviteService);
//# sourceMappingURL=pong-invite.service.js.map