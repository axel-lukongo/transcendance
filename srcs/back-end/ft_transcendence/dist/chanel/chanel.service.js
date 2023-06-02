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
const client_1 = require("@prisma/client");
let ChanelService = class ChanelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createChanelInput) {
        return this.prisma.chanel.create({
            data: createChanelInput
        });
    }
    findAll() {
        console.log("\n\n 3================================ \n\n");
        return this.prisma.chanel.findMany({});
    }
    findOne(id) {
        return this.prisma.chanel.findUnique({ where: { id: id } });
    }
    remove(id) {
        return this.prisma.chanel.delete({ where: { id: id } });
    }
};
ChanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], ChanelService);
exports.ChanelService = ChanelService;
//# sourceMappingURL=chanel.service.js.map