"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChanelModule = void 0;
const common_1 = require("@nestjs/common");
const chanel_service_1 = require("./chanel.service");
const chanel_resolver_1 = require("./chanel.resolver");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const messages_module_1 = require("../messages/messages.module");
const messages_service_1 = require("../messages/messages.service");
const messages_resolver_1 = require("../messages/messages.resolver");
const banned_module_1 = require("./banned/banned.module");
const tobloc_service_1 = require("../messages/tobloc/tobloc.service");
let ChanelModule = exports.ChanelModule = class ChanelModule {
};
exports.ChanelModule = ChanelModule = __decorate([
    (0, common_1.Module)({
        imports: [messages_module_1.MessagesModule, banned_module_1.BannedModule],
        providers: [chanel_resolver_1.ChanelResolver, chanel_service_1.ChanelService, prisma_service_1.PrismaService, users_service_1.UsersService, messages_service_1.MessagesService, messages_resolver_1.MessagesResolver, tobloc_service_1.ToblocService]
    })
], ChanelModule);
//# sourceMappingURL=chanel.module.js.map