"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const authentication_resolver_1 = require("./authentication.resolver");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const mailing_module_1 = require("./mailing/mailing.module");
const mailing_service_1 = require("./mailing/mailing.service");
const users_resolver_1 = require("../users/users.resolver");
let AuthenticationModule = exports.AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        providers: [authentication_resolver_1.AuthenticationResolver, authentication_service_1.AuthenticationService, users_resolver_1.UsersResolver, users_service_1.UsersService, prisma_service_1.PrismaService, mailing_service_1.MailingService,],
        imports: [mailing_module_1.MailingModule,]
    })
], AuthenticationModule);
//# sourceMappingURL=authentication.module.js.map