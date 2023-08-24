"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_resolver_1 = require("./messages.resolver");
const messages_service_1 = require("./messages.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const tobloc_module_1 = require("./tobloc/tobloc.module");
const tobloc_service_1 = require("./tobloc/tobloc.service");
let MessagesModule = exports.MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [tobloc_module_1.ToblocModule],
        providers: [messages_service_1.MessagesService, messages_resolver_1.MessagesResolver, prisma_service_1.PrismaService, tobloc_service_1.ToblocService]
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map