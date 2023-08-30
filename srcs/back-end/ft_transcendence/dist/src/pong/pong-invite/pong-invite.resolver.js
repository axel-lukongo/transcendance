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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongInviteResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const pong_invite_service_1 = require("./pong-invite.service");
const pong_invite_entity_1 = require("./entities/pong-invite.entity");
let PongInviteResolver = exports.PongInviteResolver = class PongInviteResolver {
    constructor(pongInviteService) {
        this.pongInviteService = pongInviteService;
    }
    async setPongInvite(friendId, context) {
        return await this.pongInviteService.setPongInvite(context.req.userId, friendId);
    }
    async findPongInviteByWaitingRoomId(waitingRoomId) {
        return this.pongInviteService.findPongInviteByWaitingRoomId(waitingRoomId);
    }
    removePongInvite(id) {
        return this.pongInviteService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => pong_invite_entity_1.PongInvite),
    __param(0, (0, graphql_1.Args)('friendId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PongInviteResolver.prototype, "setPongInvite", null);
__decorate([
    (0, graphql_1.Mutation)(() => pong_invite_entity_1.PongInvite),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PongInviteResolver.prototype, "removePongInvite", null);
exports.PongInviteResolver = PongInviteResolver = __decorate([
    (0, graphql_1.Resolver)(() => pong_invite_entity_1.PongInvite),
    __metadata("design:paramtypes", [pong_invite_service_1.PongInviteService])
], PongInviteResolver);
//# sourceMappingURL=pong-invite.resolver.js.map