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
exports.PongInvite = void 0;
const graphql_1 = require("@nestjs/graphql");
const waiting_room_entity_1 = require("../../waiting-room/entities/waiting-room.entity");
let PongInvite = exports.PongInvite = class PongInvite {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PongInvite.prototype, "userId1", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PongInvite.prototype, "userId2", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PongInvite.prototype, "waitingRoomId", void 0);
__decorate([
    (0, graphql_1.Field)(() => waiting_room_entity_1.WaitingRoom),
    __metadata("design:type", waiting_room_entity_1.WaitingRoom)
], PongInvite.prototype, "waitingRoom", void 0);
exports.PongInvite = PongInvite = __decorate([
    (0, graphql_1.ObjectType)()
], PongInvite);
//# sourceMappingURL=pong-invite.entity.js.map