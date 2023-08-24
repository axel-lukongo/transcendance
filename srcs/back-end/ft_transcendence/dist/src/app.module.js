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
const users_module_1 = require("./users/users.module");
const chanel_module_1 = require("./chanel/chanel.module");
const messages_module_1 = require("./messages/messages.module");
const apollo_1 = require("@nestjs/apollo");
const contacts_module_1 = require("./contacts/contacts.module");
const authMiddleware_1 = require("./middleware/authMiddleware");
const path_1 = require("path");
const authentication_module_1 = require("./authentication/authentication.module");
const mailing_module_1 = require("./authentication/mailing/mailing.module");
const pong_module_1 = require("./pong/pong.module");
const user_chanels_module_1 = require("./user-chanels/user-chanels.module");
const jsonwebtoken_1 = require("jsonwebtoken");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(authMiddleware_1.AuthMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
    ;
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useFactory: () => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schemas.gql'),
                    playground: true,
                    installSubscriptionHandlers: true,
                    context: ({ req, res, payload, connection }) => {
                        if (connection)
                            return ({ context: connection.context });
                        else
                            return ({
                                req,
                                res,
                                payload,
                                connection
                            });
                    },
                    subscriptions: {
                        'subscriptions-transport-ws': {
                            onConnect: (connecParam, wsocket, context) => {
                                const headers = connecParam.headers;
                                const decodedToken = (0, jsonwebtoken_1.verify)(headers, process.env.CLIENT_SECRET_BACKEND);
                                return ({
                                    token: decodedToken,
                                });
                            }
                        }
                    }
                }),
            }),
            mailing_module_1.MailingModule,
            users_module_1.UsersModule,
            chanel_module_1.ChanelModule,
            messages_module_1.MessagesModule,
            contacts_module_1.ContactsModule,
            authentication_module_1.AuthenticationModule,
            pong_module_1.PongModule,
            user_chanels_module_1.UserChanelsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map