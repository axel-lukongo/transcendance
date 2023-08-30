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
exports.ToblocResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tobloc_service_1 = require("./tobloc.service");
const tobloc_entity_1 = require("./entities/tobloc.entity");
const chanel_service_1 = require("../../chanel/chanel.service");
const contacts_service_1 = require("../../contacts/contacts.service");
const users_service_1 = require("../../users/users.service");
let ToblocResolver = exports.ToblocResolver = class ToblocResolver {
    constructor(toblocService, chanelService, contactService, usersService) {
        this.toblocService = toblocService;
        this.chanelService = chanelService;
        this.contactService = contactService;
        this.usersService = usersService;
    }
    async createToBloc(blockerId, blockedId) {
        const createToblocInput = {
            blocker_id: blockerId,
            blocked_id: blockedId,
        };
        const newToBloc = await this.toblocService.create(createToblocInput);
        await this.chanelService.removeDirectMsg(blockerId, blockedId);
        await this.contactService.deleteContact(blockerId, blockedId);
        return newToBloc;
    }
    findAll(id) {
        return this.toblocService.findAll(id);
    }
    findOne(id) {
        return this.toblocService.findOne(id);
    }
    async UserBlocked(other_userId, context) {
        return await this.toblocService.YourBloc(context.req.userId, other_userId);
    }
    removeTobloc(id) {
        return this.toblocService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => tobloc_entity_1.Tobloc),
    __param(0, (0, graphql_1.Args)('blockerId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('blockedId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ToblocResolver.prototype, "createToBloc", null);
__decorate([
    (0, graphql_1.Query)(() => [tobloc_entity_1.Tobloc], { name: 'person_blocked' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ToblocResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => tobloc_entity_1.Tobloc, { name: 'tobloc' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ToblocResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => tobloc_entity_1.Tobloc, { name: 'IsBlocked' }),
    __param(0, (0, graphql_1.Args)('other_userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ToblocResolver.prototype, "UserBlocked", null);
__decorate([
    (0, graphql_1.Mutation)(() => tobloc_entity_1.Tobloc),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ToblocResolver.prototype, "removeTobloc", null);
exports.ToblocResolver = ToblocResolver = __decorate([
    (0, graphql_1.Resolver)(() => tobloc_entity_1.Tobloc),
    __metadata("design:paramtypes", [tobloc_service_1.ToblocService,
        chanel_service_1.ChanelService,
        contacts_service_1.ContactsService,
        users_service_1.UsersService])
], ToblocResolver);
//# sourceMappingURL=tobloc.resolver.js.map