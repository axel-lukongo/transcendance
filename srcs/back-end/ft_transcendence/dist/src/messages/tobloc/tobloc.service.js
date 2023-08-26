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
exports.ToblocService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ToblocService = exports.ToblocService = class ToblocService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(id) {
        return this.prisma.toBloc.findMany({ where: { blocker_id: id },
            include: { blocked: true }
        });
    }
    async findOne(id) {
        return this.prisma.toBloc.findUnique({ where: { id: id } });
    }
    create(bloc) {
        return this.prisma.toBloc.create({ data: bloc });
    }
    remove(id) {
        return this.prisma.toBloc.delete({ where: { id: id } });
    }
    async is_blocked(blockerId, blockedId) {
        const user_is_blocked = await this.prisma.toBloc.findFirst({
            where: {
                blocker_id: blockerId,
                blocked_id: blockedId,
            },
        });
        if (user_is_blocked)
            return true;
        else
            return false;
    }
    async YourBloc(blockerId, blockedId) {
        return await this.prisma.toBloc.findFirst({
            where: {
                OR: [
                    {
                        blocker_id: blockerId,
                        blocked_id: blockedId,
                    },
                    {
                        blocker_id: blockedId,
                        blocked_id: blockerId,
                    },
                ],
            },
        });
    }
};
exports.ToblocService = ToblocService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ToblocService);
//# sourceMappingURL=tobloc.service.js.map