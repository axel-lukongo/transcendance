"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_1 = require("@nestjs/graphql");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.init();
    const { schema } = app.get(graphql_1.GraphQLSchemaHost);
    const server = new server_1.ApolloServer({
        schema
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
        listen: { port: 4000 },
    });
}
bootstrap();
//# sourceMappingURL=main.js.map