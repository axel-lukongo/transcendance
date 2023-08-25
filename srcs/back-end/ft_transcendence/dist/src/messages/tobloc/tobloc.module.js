"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToblocModule = void 0;
const common_1 = require("@nestjs/common");
const tobloc_service_1 = require("./tobloc.service");
const tobloc_resolver_1 = require("./tobloc.resolver");
const prisma_service_1 = require("../../../prisma/prisma.service");
const chanel_service_1 = require("../../chanel/chanel.service");
const users_service_1 = require("../../users/users.service");
const contacts_service_1 = require("../../contacts/contacts.service");
const messages_service_1 = require("../messages.service");
let ToblocModule = exports.ToblocModule = class ToblocModule {
};
exports.ToblocModule = ToblocModule = __decorate([
    (0, common_1.Module)({
        providers: [tobloc_resolver_1.ToblocResolver, tobloc_service_1.ToblocService, prisma_service_1.PrismaService, chanel_service_1.ChanelService, users_service_1.UsersService, contacts_service_1.ContactsService, messages_service_1.MessagesService]
    })
], ToblocModule);
//# sourceMappingURL=tobloc.module.js.map