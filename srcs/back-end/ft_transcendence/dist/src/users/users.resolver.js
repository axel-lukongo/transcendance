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
exports.UsersResolver = exports.CHANGE_STATE = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const update_user_input_1 = require("./dto/update-user.input");
const main_1 = require("../main");
exports.CHANGE_STATE = 'changeState';
let UsersResolver = exports.UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAllUsers(context) {
        return this.usersService.findAll();
    }
    findUserById(id) {
        return this.usersService.findUserById(id);
    }
    async updateUser(updateUserInput) {
        const updateUser = await this.usersService.update(updateUserInput.id, updateUserInput);
        main_1.socket.publish(exports.CHANGE_STATE, {
            changeState: updateUser
        });
        return updateUser;
    }
    removeUser(id) {
        return this.usersService.remove(id);
    }
    searchUsers(research, context) {
        return this.usersService.researchUsers(research, context.req.userId);
    }
    searchUserForChanel(chanel_id, context) {
        return this.usersService.researchUsersForAddChanel(context.req.userId, chanel_id);
    }
    async updateState(new_state, context) {
        if (new_state < 1 || new_state > 4) {
            throw new Error("Unrecognized state");
        }
        const updateUserDataInput = {
            id: context.req.userId,
            state: new_state
        };
        return await this.updateUser(updateUserDataInput);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'findAllUsers' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findAllUsers", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'findUserById' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findUserById", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    __param(0, (0, graphql_1.Args)("research", { type: () => String })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "searchUsers", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: "searchUserForChan" }),
    __param(0, (0, graphql_1.Args)("chanel_id", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "searchUserForChanel", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User, { name: "updateState" }),
    __param(0, (0, graphql_1.Args)("new_state", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateState", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map