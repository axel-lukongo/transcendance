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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.user.findMany({});
    }
    findUserById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    findUserByToken(token) {
        return this.prisma.user.findUnique({ where: { token } });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id: data.id },
            data
        });
    }
    remove(id) {
        return this.prisma.user.delete({ where: { id: id } });
    }
    researchUsers(research, user_id) {
        let users = this.prisma.user.findMany({
            where: {
                nickname: {
                    contains: research
                },
                NOT: {
                    OR: [
                        { id: user_id },
                        { contact: { some: {
                                    OR: [
                                        { user: { id: user_id } },
                                        { contact: { id: user_id } }
                                    ]
                                } } },
                        { reverse_contact: { some: {
                                    OR: [
                                        { user: { id: user_id } },
                                        { contact: { id: user_id } }
                                    ]
                                } } }
                    ]
                }
            }
        });
        return (users);
    }
    researchUsersForAddChanel(user_id, chan_id) {
        return this.prisma.user.findMany({
            where: {
                nickname: { contains: "" },
                NOT: {
                    OR: [
                        { id: user_id },
                        { chanels: {
                                some: { chanel_id: chan_id }
                            } },
                        { user_ban: {
                                some: {
                                    channel_id: chan_id
                                }
                            }
                        }
                    ]
                }
            }
        });
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map