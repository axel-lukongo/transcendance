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
exports.BannedResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const banned_service_1 = require("./banned.service");
const banned_entity_1 = require("./entities/banned.entity");
const create_banned_input_1 = require("./dto/create-banned.input");
const user_chanels_service_1 = require("../../user-chanels/user-chanels.service");
let BannedResolver = exports.BannedResolver = class BannedResolver {
    constructor(bannedService, userChanelService) {
        this.bannedService = bannedService;
        this.userChanelService = userChanelService;
    }
    async createBanned(createBannedInput, context) {
        const userId = context.req.userId;
        const I_amAdmin = await this.userChanelService.isAdministrator(createBannedInput.channel_id, userId);
        const he_is_Owner = await this.userChanelService.IsOwnerInChannel(createBannedInput.user_id, createBannedInput.channel_id);
        if (I_amAdmin && !he_is_Owner)
            return this.bannedService.create(createBannedInput);
        else
            return 'action denied';
    }
    async findAll(channelId) {
        return this.bannedService.findAll(channelId);
    }
    removeBanned(userId, channelId) {
        return this.bannedService.remove(userId, channelId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => banned_entity_1.Banned),
    __param(0, (0, graphql_1.Args)('createBannedInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banned_input_1.CreateBannedInput, Object]),
    __metadata("design:returntype", Promise)
], BannedResolver.prototype, "createBanned", null);
__decorate([
    (0, graphql_1.Query)(() => [banned_entity_1.Banned], { name: 'banned_list' }),
    __param(0, (0, graphql_1.Args)('channelId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BannedResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => banned_entity_1.Banned),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('channelId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BannedResolver.prototype, "removeBanned", null);
exports.BannedResolver = BannedResolver = __decorate([
    (0, graphql_1.Resolver)(() => banned_entity_1.Banned),
    __metadata("design:paramtypes", [banned_service_1.BannedService,
        user_chanels_service_1.UserChanelsService])
], BannedResolver);
//# sourceMappingURL=banned.resolver.js.map