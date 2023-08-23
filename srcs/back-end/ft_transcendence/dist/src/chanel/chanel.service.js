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
exports.ChanelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let ChanelService = exports.ChanelService = class ChanelService {
    constructor(prisma, user) {
        this.prisma = prisma;
        this.user = user;
    }
    async create(createChanelInput) {
        try {
            let chanelRes = await this.prisma.chanel.create({
                data: createChanelInput,
            });
            let user_chanel = await this.prisma.users_Chanels.create({
                data: {
                    chanel_id: chanelRes.id,
                    user_id: chanelRes.owner_id,
                    pending: false,
                    is_admin: true,
                    is_muted: false,
                }
            });
            return chanelRes;
        }
        catch (e) {
            return new Error("Error during chanel creation: " + e);
        }
    }
    async findOne(id) {
        return this.prisma.chanel.findUnique({ where: { id: id } });
    }
    async update(id, data) {
        return this.prisma.chanel.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.chanel.delete({ where: { id: id } });
    }
    async getOwnChanels(user_id) {
        return this.prisma.chanel.findMany({ where: { owner_id: user_id } });
    }
    async getChannelByOwnersAndInterlocutor(userId1, userId2) {
        return this.prisma.chanel.findFirst({
            where: {
                OR: [
                    {
                        owner_id: userId1,
                        interlocutor_id: userId2,
                    },
                    {
                        owner_id: userId2,
                        interlocutor_id: userId1,
                    },
                ],
            },
            include: { interlocutor: true }
        });
    }
    async removeDirectMsg(userId1, userId2) {
        const chan = await this.prisma.chanel.findFirst({
            where: {
                OR: [
                    {
                        owner_id: userId1,
                        interlocutor_id: userId2,
                    },
                    {
                        owner_id: userId2,
                        interlocutor_id: userId1,
                    },
                ],
            },
        });
        if (chan) {
            await this.prisma.users_Chanels.deleteMany({
                where: {
                    chanel_id: chan.id,
                },
            });
            return this.prisma.chanel.delete({ where: { id: chan.id } });
        }
        else {
            return null;
        }
    }
};
exports.ChanelService = ChanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], ChanelService);
//# sourceMappingURL=chanel.service.js.map