"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedModule = void 0;
const common_1 = require("@nestjs/common");
const banned_service_1 = require("./banned.service");
const banned_resolver_1 = require("./banned.resolver");
const prisma_service_1 = require("../../../prisma/prisma.service");
const user_chanels_service_1 = require("../../user-chanels/user-chanels.service");
let BannedModule = exports.BannedModule = class BannedModule {
};
exports.BannedModule = BannedModule = __decorate([
    (0, common_1.Module)({
        providers: [banned_resolver_1.BannedResolver, banned_service_1.BannedService, prisma_service_1.PrismaService, user_chanels_service_1.UserChanelsService]
    })
], BannedModule);
//# sourceMappingURL=banned.module.js.map