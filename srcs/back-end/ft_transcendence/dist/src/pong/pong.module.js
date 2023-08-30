"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongModule = void 0;
const common_1 = require("@nestjs/common");
const pong_service_1 = require("./pong.service");
const pong_resolver_1 = require("./pong.resolver");
const player_module_1 = require("./player/player.module");
const prisma_service_1 = require("../../prisma/prisma.service");
const waiting_room_module_1 = require("./waiting-room/waiting-room.module");
const player_service_1 = require("./player/player.service");
const player_resolver_1 = require("./player/player.resolver");
const ball_module_1 = require("./ball/ball.module");
const waiting_room_resolver_1 = require("./waiting-room/waiting-room.resolver");
const waiting_room_service_1 = require("./waiting-room/waiting-room.service");
const ball_resolver_1 = require("./ball/ball.resolver");
const ball_service_1 = require("./ball/ball.service");
const users_resolver_1 = require("../users/users.resolver");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const pong_invite_resolver_1 = require("./pong-invite/pong-invite.resolver");
const pong_invite_service_1 = require("./pong-invite/pong-invite.service");
let PongModule = exports.PongModule = class PongModule {
};
exports.PongModule = PongModule = __decorate([
    (0, common_1.Module)({
        providers: [pong_resolver_1.PongResolver,
            pong_service_1.PongService,
            player_resolver_1.PlayerResolver,
            player_service_1.PlayerService,
            waiting_room_resolver_1.WaitingRoomResolver,
            waiting_room_service_1.WaitingRoomService,
            ball_resolver_1.BallResolver,
            ball_service_1.BallService,
            users_resolver_1.UsersResolver,
            users_service_1.UsersService,
            pong_resolver_1.TimerService,
            pong_invite_resolver_1.PongInviteResolver,
            pong_invite_service_1.PongInviteService,
            prisma_service_1.PrismaService],
        imports: [player_module_1.PlayerModule, waiting_room_module_1.WaitingRoomModule, users_module_1.UsersModule, ball_module_1.BallModule]
    })
], PongModule);
//# sourceMappingURL=pong.module.js.map