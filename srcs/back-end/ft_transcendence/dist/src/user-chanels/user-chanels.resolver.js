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
exports.UserChanelsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_chanel_entity_1 = require("./entities/user_chanel.entity");
const chanel_service_1 = require("../chanel/chanel.service");
const user_chanels_service_1 = require("./user-chanels.service");
const add_user_chanel_input_1 = require("./dto/add-user-chanel.input");
const chanel_entity_1 = require("../chanel/entities/chanel.entity");
const update_chanel_user_input_1 = require("./dto/update-chanel-user.input");
let UserChanelsResolver = exports.UserChanelsResolver = class UserChanelsResolver {
    constructor(chanelService, userChanelService) {
        this.chanelService = chanelService;
        this.userChanelService = userChanelService;
    }
    async addUser(addUserChanel) {
        const isBanned = await this.userChanelService.UserBanInChannel(addUserChanel.user_id, addUserChanel.chanel_id);
        if (isBanned) {
            return 'this user is banned';
        }
        return this.userChanelService.addUser(addUserChanel);
    }
    ChanelsOwner(chanel) {
        return this.chanelService.findOne(chanel.chanel_id);
    }
    acceptRequest(Requestkey) {
        return this.userChanelService.acceptRequest(Requestkey);
    }
    chanelRequest(context) {
        return this.userChanelService.findMyRequestChanels(context.req.userId);
    }
    findMyChanels(context, private_chan) {
        return this.userChanelService.findMyChanels(context.req.userId, private_chan);
    }
    findMembers(channel_id) {
        return this.userChanelService.findMembersOfChan(channel_id);
    }
    async deleteChanelUser(key, context) {
        const userId = context.req.userId;
        if (key.user_id !== userId) {
            const I_amAdmin = await this.userChanelService.isAdministrator(key.chanel_id, key.user_id);
            const he_is_Admin = await this.userChanelService.isAdministrator(key.chanel_id, userId);
            if (I_amAdmin || !he_is_Admin) {
                return 'you don t have the permission';
            }
        }
        return this.userChanelService.delete(key, userId);
    }
    async updateChanelUser(key, context) {
        const userId = context.req.userId;
        const isAdmin = await this.userChanelService.isAdministrator(key.chanel_id, userId);
        const he_is_Owner = await this.userChanelService.IsOwnerInChannel(key.user_id, key.chanel_id);
        if (!isAdmin || he_is_Owner) {
            return 'you don t have the permission';
        }
        return this.userChanelService.update(key);
    }
    async updateChanelAdmin(key, context) {
        const userId = context.req.userId;
        const isOwner = await this.userChanelService.IsOwnerInChannel(userId, key.chanel_id);
        if (!isOwner) {
            return 'you don t have the permission';
        }
        return this.userChanelService.update(key);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_chanel_entity_1.UsersChanels),
    __param(0, (0, graphql_1.Args)('addUserChanel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_user_chanel_input_1.AddUserChanel]),
    __metadata("design:returntype", Promise)
], UserChanelsResolver.prototype, "addUser", null);
__decorate([
    (0, graphql_1.ResolveField)(() => chanel_entity_1.Chanel, { name: "chanels" }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_chanel_entity_1.UsersChanels]),
    __metadata("design:returntype", void 0)
], UserChanelsResolver.prototype, "ChanelsOwner", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_chanel_entity_1.UsersChanels, { name: "acceptRequest" }),
    __param(0, (0, graphql_1.Args)("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chanel_user_input_1.UpdateChanelUserInput]),
    __metadata("design:returntype", void 0)
], UserChanelsResolver.prototype, "acceptRequest", null);
__decorate([
    (0, graphql_1.Query)(() => [user_chanel_entity_1.UsersChanels], { name: "chanelsRequest" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserChanelsResolver.prototype, "chanelRequest", null);
__decorate([
    (0, graphql_1.Query)(() => [chanel_entity_1.Chanel], { name: 'myChanels' }),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)("private_chan", { type: () => Boolean })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], UserChanelsResolver.prototype, "findMyChanels", null);
__decorate([
    (0, graphql_1.Query)(() => [user_chanel_entity_1.UsersChanels], { name: 'ChannelMembers' }),
    __param(0, (0, graphql_1.Args)("channel_id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserChanelsResolver.prototype, "findMembers", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_chanel_entity_1.UsersChanels || [user_chanel_entity_1.UsersChanels], { name: "deleteChanelUser" }),
    __param(0, (0, graphql_1.Args)("key")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chanel_user_input_1.UpdateChanelUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserChanelsResolver.prototype, "deleteChanelUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_chanel_entity_1.UsersChanels, { name: "updateChanelUser" }),
    __param(0, (0, graphql_1.Args)("key")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chanel_user_input_1.UpdateChanelUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserChanelsResolver.prototype, "updateChanelUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_chanel_entity_1.UsersChanels, { name: "updateChanelAdmin" }),
    __param(0, (0, graphql_1.Args)("key")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chanel_user_input_1.UpdateChanelUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserChanelsResolver.prototype, "updateChanelAdmin", null);
exports.UserChanelsResolver = UserChanelsResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_chanel_entity_1.UsersChanels),
    __metadata("design:paramtypes", [chanel_service_1.ChanelService,
        user_chanels_service_1.UserChanelsService])
], UserChanelsResolver);
//# sourceMappingURL=user-chanels.resolver.js.map