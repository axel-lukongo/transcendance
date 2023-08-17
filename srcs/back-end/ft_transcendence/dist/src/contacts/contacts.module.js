"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const contacts_service_1 = require("./contacts.service");
const contacts_resolver_1 = require("./contacts.resolver");
const prisma_service_1 = require("../../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const tobloc_service_1 = require("../messages/tobloc/tobloc.service");
let ContactsModule = exports.ContactsModule = class ContactsModule {
};
exports.ContactsModule = ContactsModule = __decorate([
    (0, common_1.Module)({
        providers: [contacts_service_1.ContactsService, contacts_resolver_1.ContactsResolver, prisma_service_1.PrismaService, users_service_1.UsersService, tobloc_service_1.ToblocService]
    })
], ContactsModule);
//# sourceMappingURL=contacts.module.js.map