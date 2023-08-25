"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingRoomModule = void 0;
const common_1 = require("@nestjs/common");
const waiting_room_service_1 = require("./waiting-room.service");
const waiting_room_resolver_1 = require("./waiting-room.resolver");
const prisma_service_1 = require("../../../prisma/prisma.service");
let WaitingRoomModule = exports.WaitingRoomModule = class WaitingRoomModule {
};
exports.WaitingRoomModule = WaitingRoomModule = __decorate([
    (0, common_1.Module)({
        providers: [waiting_room_resolver_1.WaitingRoomResolver, waiting_room_service_1.WaitingRoomService, prisma_service_1.PrismaService]
    })
], WaitingRoomModule);
//# sourceMappingURL=waiting-room.module.js.map