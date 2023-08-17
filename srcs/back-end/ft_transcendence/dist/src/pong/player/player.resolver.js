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
exports.PlayerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const player_entity_1 = require("./entities/player.entity");
const player_service_1 = require("./player.service");
const create_player_input_1 = require("./dto/create-player.input");
const update_player_input_1 = require("./dto/update-player.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
const PLAYER_UPDATED_EVENT = 'playerUp';
const PLAYER_CREATE_EVENT = 'playercCreated';
let PlayerResolver = exports.PlayerResolver = class PlayerResolver {
    constructor(playerService) {
        this.playerService = playerService;
    }
    findAllPlayers() {
        return this.playerService.findAll();
    }
    findPlayer(id) {
        return this.playerService.findUnique(id);
    }
    removePlayer(id) {
        return this.playerService.remove(id);
    }
    async findWaitingRoomPlayer(id) {
        return this.playerService.findWaitingRoomPlayers(id);
    }
    async createPlayer(createPlayerInput) {
        const newPlayer = this.playerService.create(createPlayerInput);
        pubSub.publish(PLAYER_CREATE_EVENT, {
            listPlayerSubscription: this.findWaitingRoomPlayer((await newPlayer).waitingRoomId)
        });
        return newPlayer;
    }
    listPlayerSubscription() {
        return pubSub.asyncIterator(PLAYER_CREATE_EVENT);
    }
    updatePlayer(updatePlayerInput) {
        const playerUp = this.playerService.update(updatePlayerInput.id, updatePlayerInput);
        pubSub.publish(PLAYER_UPDATED_EVENT, {
            playerUpdatedSubscription: playerUp,
        });
        return playerUp;
    }
    playerUpdatedSubscription(id) {
        return pubSub.asyncIterator(PLAYER_UPDATED_EVENT);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [player_entity_1.Player], { name: 'Players' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "findAllPlayers", null);
__decorate([
    (0, graphql_1.Query)(() => player_entity_1.Player, { name: 'findPlayer' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "findPlayer", null);
__decorate([
    (0, graphql_1.Mutation)(() => player_entity_1.Player),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "removePlayer", null);
__decorate([
    (0, graphql_1.Query)(() => [player_entity_1.Player]),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlayerResolver.prototype, "findWaitingRoomPlayer", null);
__decorate([
    (0, graphql_1.Mutation)(() => player_entity_1.Player),
    __param(0, (0, graphql_1.Args)('createPlayerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_input_1.CreatePlayerInput]),
    __metadata("design:returntype", Promise)
], PlayerResolver.prototype, "createPlayer", null);
__decorate([
    (0, graphql_1.Subscription)(() => [player_entity_1.Player], {
        filter: async (payload, variables) => {
            const resolvedPayload = await payload.listPlayerSubscription;
            return resolvedPayload.id === variables.id;
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "listPlayerSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => player_entity_1.Player),
    __param(0, (0, graphql_1.Args)('updatePlayerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_player_input_1.UpdatePlayerInput]),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "updatePlayer", null);
__decorate([
    (0, graphql_1.Subscription)(() => player_entity_1.Player, {
        filter: async (payload, variables) => {
            const resolvedPayload = await payload.playerUpdatedSubscription;
            return resolvedPayload.id === variables.id;
        }
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayerResolver.prototype, "playerUpdatedSubscription", null);
exports.PlayerResolver = PlayerResolver = __decorate([
    (0, graphql_1.Resolver)(() => player_entity_1.Player),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], PlayerResolver);
//# sourceMappingURL=player.resolver.js.map