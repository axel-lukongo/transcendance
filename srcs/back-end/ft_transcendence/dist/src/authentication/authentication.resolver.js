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
exports.AuthenticationResolver = exports.CHANGE_STATE = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../users/entities/user.entity");
const create_authentication_input_1 = require("./dto/create-authentication.input");
const authentication_service_1 = require("./authentication.service");
const users_service_1 = require("../users/users.service");
const mailing_service_1 = require("./mailing/mailing.service");
const auth_utils_1 = require("../utils/auth.utils");
const axios_1 = require("axios");
const main_1 = require("../main");
exports.CHANGE_STATE = 'changeState';
let AuthenticationResolver = exports.AuthenticationResolver = class AuthenticationResolver {
    constructor(authService, userService, mailingService) {
        this.authService = authService;
        this.userService = userService;
        this.mailingService = mailingService;
    }
    async createUser(createAuthenticationInput, context) {
        if (this.intraLogin && this.email) {
            try {
                const createUserInput = Object.assign(Object.assign({}, createAuthenticationInput), { intra_login: this.intraLogin, email: this.email });
                let user = await this.authService.create(createUserInput);
                return (user);
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
        this.intraLogin = profileResponse.data.login;
        this.email = profileResponse.data.email;
        this.user = await this.authService.findUserByIntraLogin(this.intraLogin);
        if (!this.user) {
            throw new Error("This user does not exist yet");
        }
        else if (this.user.tfa_code) {
            const tfa_code = (0, auth_utils_1.generateTwoFactorCode)();
            const updatedUser = await this.userService.update(this.user.id, { id: this.user.id, tfa_code });
            this.mailingService.sendMail(this.user.email, tfa_code);
            this.user = updatedUser;
            throw new Error("To complete authentication, 2FA verification is required");
        }
        return this.user;
    }
    async checkTwoAuthenticationFactor(code) {
        if (this.user && this.user.tfa_code === code) {
            this.user.tfa_code = "true";
            return this.user;
        }
        else {
            throw new Error('Invalid two-factor authentication code');
        }
    }
    async updateState(new_state, context) {
        if (new_state < 1 || new_state > 3)
            throw new Error("Unrecognized state");
        const updateUser = await this.userService.update(context.req.userId, { id: context.req.userId, state: new_state });
        main_1.socket.publish(exports.CHANGE_STATE, {
            changeState: updateUser
        });
        return updateUser;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('createAuthenticationInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_authentication_input_1.CreateAuthenticationInput, Object]),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
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
        users_service_1.UsersService,
        mailing_service_1.MailingService])
], AuthenticationResolver);
//# sourceMappingURL=authentication.resolver.js.map