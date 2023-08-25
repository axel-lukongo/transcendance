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
exports.WaitingRoomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const waiting_room_service_1 = require("./waiting-room.service");
const waiting_room_entity_1 = require("./entities/waiting-room.entity");
let WaitingRoomResolver = exports.WaitingRoomResolver = class WaitingRoomResolver {
    constructor(waitingRoomService) {
        this.waitingRoomService = waitingRoomService;
    }
    createWaitingRoom() {
        return this.waitingRoomService.create();
    }
    findWaitingRooms() {
        return this.waitingRoomService.findAll();
    }
    findWaitingRoom(id) {
        return this.waitingRoomService.findUnique(id);
    }
    removeWaitingRoom(id) {
        return this.waitingRoomService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => waiting_room_entity_1.WaitingRoom),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WaitingRoomResolver.prototype, "createWaitingRoom", null);
__decorate([
    (0, graphql_1.Query)(() => [waiting_room_entity_1.WaitingRoom], { name: 'findWaitingRooms' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WaitingRoomResolver.prototype, "findWaitingRooms", null);
__decorate([
    (0, graphql_1.Query)(() => waiting_room_entity_1.WaitingRoom, { name: 'findWaitingRoom' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WaitingRoomResolver.prototype, "findWaitingRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => waiting_room_entity_1.WaitingRoom),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WaitingRoomResolver.prototype, "removeWaitingRoom", null);
exports.WaitingRoomResolver = WaitingRoomResolver = __decorate([
    (0, graphql_1.Resolver)(() => waiting_room_entity_1.WaitingRoom),
    __metadata("design:paramtypes", [waiting_room_service_1.WaitingRoomService])
], WaitingRoomResolver);
//# sourceMappingURL=waiting-room.resolver.js.map