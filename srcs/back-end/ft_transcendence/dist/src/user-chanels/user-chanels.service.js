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
exports.UserChanelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserChanelsService = exports.UserChanelsService = class UserChanelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMyChanels(user_id, private_chan) {
        if (private_chan === true) {
            return this.prisma.chanel.findMany({
                where: {
                    private: private_chan,
                    directMsg: false,
                    users: {
                        some: {
                            user_id: user_id,
                        }
                    },
                }
            });
        }
        else {
            return this.prisma.chanel.findMany({
                where: {
                    private: private_chan,
                    directMsg: false,
                }
            });
        }
    }
    async findMyRequestChanels(user_id) {
        return this.prisma.users_Chanels.findMany({
            where: { user_id, pending: true, chanel: { directMsg: false } }
        });
    }
    async addUser(input) {
        return this.prisma.users_Chanels.create({
            data: {
                user: { connect: { id: input.user_id } },
                chanel: { connect: { id: input.chanel_id } }
            }
        });
    }
    async acceptRequest(Requestkey) {
        return this.prisma.users_Chanels.update({
            where: {
                user_id_chanel_id: {
                    user_id: Requestkey.user_id,
                    chanel_id: Requestkey.chanel_id,
                },
            },
            data: {
                pending: false,
                is_muted: Requestkey.is_muted,
                is_admin: Requestkey.is_admin,
            },
        });
    }
    async update(key) {
        const currentTimeInMillis = Math.floor(new Date().getTime() / 60000);
        const updatedUsersChanels = await this.prisma.users_Chanels.update({
            where: {
                user_id_chanel_id: {
                    user_id: key.user_id,
                    chanel_id: key.chanel_id,
                },
            },
            data: {
                pending: false,
                is_muted: key.is_muted,
                is_admin: key.is_admin,
                mute_start_time: key.is_muted === true ? currentTimeInMillis : 0,
            },
        });
        return updatedUsersChanels;
    }
    async isAdministrator(channel_id, userID) {
        const chan_executor = await this.prisma.users_Chanels.findUnique({
            where: {
                user_id_chanel_id: {
                    user_id: userID,
                    chanel_id: channel_id,
                },
            },
        });
        if (chan_executor.is_admin) {
            return true;
        }
        else {
            return false;
        }
    }
    async findMembersOfChan(channel_id) {
        return await this.prisma.users_Chanels.findMany({
            where: {
                chanel_id: channel_id
            },
            include: { user: true }
        });
    }
    async delete(key, userID) {
        const channel = await this.prisma.chanel.findUnique({
            where: {
                id: key.chanel_id,
            }
        });
        if ((userID === channel.owner_id) && (userID === key.user_id)) {
            const test = await this.prisma.users_Chanels.deleteMany({
                where: {
                    chanel_id: channel.id
                }
            });
            await this.prisma.chanel.delete({
                where: {
                    id: key.chanel_id
                }
            });
            return key;
        }
        const test2 = await this.prisma.users_Chanels.delete({
            where: {
                user_id_chanel_id: {
                    user_id: key.user_id,
                    chanel_id: key.chanel_id,
                },
            }
        });
        return test2;
    }
    async UserBanInChannel(userId, channelId) {
        const userChannel = await this.prisma.user_banned.findFirst({
            where: {
                user_id: userId,
                channel_id: channelId,
            },
        });
        if (userChannel)
            return true;
        return false;
    }
    async IsOwnerInChannel(userId, channelId) {
        const is_owner = await this.prisma.users_Chanels.findFirst({ where: {
                user_id: userId,
                chanel_id: channelId,
                pending: false,
                chanel: {
                    owner_id: userId
                }
            },
        });
        if (is_owner)
            return true;
        return false;
    }
    ;
};
exports.UserChanelsService = UserChanelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserChanelsService);
//# sourceMappingURL=user-chanels.service.js.map