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
exports.AuthenticationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../users/entities/user.entity");
const authentication_service_1 = require("./authentication.service");
const mailing_service_1 = require("./mailing/mailing.service");
const auth_utils_1 = require("../utils/auth.utils");
const axios_1 = require("axios");
const update_authentication_input_1 = require("./dto/update-authentication.input");
const users_resolver_1 = require("../users/users.resolver");
let AuthenticationResolver = exports.AuthenticationResolver = class AuthenticationResolver {
    constructor(authService, userResolveur, mailingService) {
        this.authService = authService;
        this.userResolveur = userResolveur;
        this.mailingService = mailingService;
    }
    async createUser(updateAuthenticationInput, context) {
        if (context.req.userId) {
            try {
                const updateUserDataInput = Object.assign(Object.assign({}, updateAuthenticationInput), { id: context.req.userId, connection_status: authentication_service_1.__ACCESS__, state: authentication_service_1.__CONNECTED__ });
                return await this.userResolveur.updateUser(updateUserDataInput);
            }
            catch (error) {
                throw new Error("createUser Error: " + error);
            }
        }
        else {
            throw new Error("You must first authenticate via the API of 42 to create an user");
        }
    }
    async makeAuthentication(code) {
        let profileResponse;
        try {
            const response = await axios_1.default.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'authorization_code',
                code: code,
                client_id: process.env.CLIENT_ID_42_API,
                client_secret: process.env.CLIENT_SECRET_42_API,
                redirect_uri: process.env.WEBSITE_URL,
            });
            const access_token = response.data.access_token;
            profileResponse = await axios_1.default.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
        }
        catch (error) {
            return { error: "42 API is not accessible. Please try again in a few minutes." };
        }
        let user = await this.authService.findUserByEmail(profileResponse.data.email);
        if (!user) {
            const createUserInput = {
                email: profileResponse.data.email,
                nickname: profileResponse.data.login
            };
            const create_user = await this.authService.create(createUserInput);
            return create_user;
        }
        else if (user.tfa_code) {
            const tfa_code = (0, auth_utils_1.generateTwoFactorCode)();
            const updateUserDataInput = {
                id: user.id,
                tfa_code: code,
                connection_status: authentication_service_1.__NEED_TFA__
            };
            this.mailingService.sendMail(user.email, tfa_code);
            return this.userResolveur.updateUser(updateUserDataInput);
        }
        return user;
    }
    async checkTwoAuthenticationFactor(code, context) {
        const user = await this.userResolveur.findUserById(context.token.userId);
        if (!user) {
            if (user.tfa_code === code) {
                const updateUserDataInput = {
                    id: context.token.userId,
                    connection_status: authentication_service_1.__ACCESS__,
                    state: authentication_service_1.__CONNECTED__,
                    tfa_code: 'true'
                };
                return await this.userResolveur.updateUser(updateUserDataInput);
            }
            else {
                throw new Error('Invalid two-factor authentication code');
            }
        }
        else {
            throw new Error('User does not found');
        }
    }
    async updateState(new_state, context) {
        if (new_state < 1 || new_state > 3) {
            throw new Error("Unrecognized state");
        }
        const updateUserDataInput = {
            id: context.req.userId,
            state: new_state
        };
        return await this.userResolveur.updateUser(updateUserDataInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('updateAuthenticationInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_authentication_input_1.UpdateAuthenticationInput, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'makeAuthentication' }),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "makeAuthentication", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('code')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "checkTwoAuthenticationFactor", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User, { name: "updateState" }),
    __param(0, (0, graphql_1.Args)("new_state", { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationResolver.prototype, "updateState", null);
exports.AuthenticationResolver = AuthenticationResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        users_resolver_1.UsersResolver,
        mailing_service_1.MailingService])
], AuthenticationResolver);
//# sourceMappingURL=authentication.resolver.js.map