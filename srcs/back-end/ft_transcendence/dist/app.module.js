"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const apollo_1 = require("@nestjs/apollo");
const chanel_service_1 = require("./chanel/chanel.service");
const chanel_resolver_1 = require("./chanel/chanel.resolver");
const client_1 = require("@prisma/client");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schemas.gql'),
                driver: apollo_1.ApolloDriver,
                playground: true,
            }),
        ],
        providers: [chanel_service_1.ChanelService, chanel_resolver_1.ChanelResolver, client_1.PrismaClient]
    })
], AppModule);
exports.AppModule = AppModule;
console.log("\n\n 1================================ \n\n");
//# sourceMappingURL=app.module.js.map