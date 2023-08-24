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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const tobloc_service_1 = require("./tobloc/tobloc.service");
let MessagesService = exports.MessagesService = class MessagesService {
    constructor(prisma, blocked) {
        this.prisma = prisma;
        this.blocked = blocked;
    }
    async findAll_msg() {
        return this.prisma.message.findMany({});
    }
    async findOne_msg(id) {
        return this.prisma.message.findUnique({ where: { id: id } });
    }
    async findAll_msg_chan(channelId, my_id) {
        const new_msg = await this.prisma.message.findMany({
            where: {
                channel_id: channelId
            }
        });
        const filteredMessages = [];
        for (const message of new_msg) {
            const isBlocked = await this.blocked.is_blocked(my_id, message.sender_id);
            if (!isBlocked) {
                filteredMessages.push(message);
            }
        }
        return filteredMessages;
    }
    create(createMsg) {
        return this.prisma.message.create({ data: createMsg });
    }
    update(id, updateMsg) {
        return this.prisma.message.update({
            where: { id: id },
            data: updateMsg,
        });
    }
    delete(id) {
        return this.prisma.message.delete({ where: { id: id } });
    }
    async isUserMutedInChannel(userId, channelId) {
        const userChannel = await this.prisma.users_Chanels.findFirst({
            where: {
                user_id: userId,
                chanel_id: channelId,
                pending: false,
            },
        });
        if ((userChannel === null || userChannel === void 0 ? void 0 : userChannel.is_muted) === true) {
            const time = Math.floor(new Date().getTime() / 60000);
            if ((time - userChannel.mute_start_time) > 5) {
                await this.prisma.users_Chanels.update({
                    where: {
                        user_id_chanel_id: {
                            user_id: userChannel.user_id,
                            chanel_id: userChannel.chanel_id,
                        },
                    },
                    data: {
                        pending: false,
                        is_muted: false,
                        is_admin: userChannel.is_admin,
                        mute_start_time: 0,
                    },
                });
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
};
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tobloc_service_1.ToblocService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map