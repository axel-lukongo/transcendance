"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const server_1 = require("@apollo/server");
const graphql_1 = require("@nestjs/graphql");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: {
            origin: "http://localhost:8080",
            credentials: true
        }
    });
    await app.init();
    const { schema } = app.get(graphql_1.GraphQLSchemaHost);
    const server = new server_1.ApolloServer({
        schema: schema,
    });
    await server.start();
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map