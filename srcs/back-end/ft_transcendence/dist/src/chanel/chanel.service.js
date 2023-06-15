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
let ChanelService = class ChanelService {
    constructor(prisma, user) {
        this.prisma = prisma;
    }
    async create(createChanelInput) {
        return this.prisma.chanel.create({
            data: createChanelInput
        });
    }
    async findAll() {
        return this.prisma.chanel.findMany({});
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
    async addUser(input) {
        return this.prisma.users_Chanels.create({
            data: {
                user: { connect: { id: input.user_id } },
                chanel: { connect: { id: input.chanel_id } }
            }
        });
    }
};
ChanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, users_service_1.UsersService])
], ChanelService);
exports.ChanelService = ChanelService;
//# sourceMappingURL=chanel.service.js.map