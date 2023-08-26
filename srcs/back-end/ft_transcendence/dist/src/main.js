"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const prisma_service_1 = require("../prisma/prisma.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.socket = new graphql_subscriptions_1.PubSub();
async function CreateEsseantialTable() {
    const prisma = new prisma_service_1.PrismaService;
    const existingWaitingRoom = await prisma.waitingRoom.findUnique({
        where: { id: 1 }
    });
    if (!existingWaitingRoom) {
        const waitingRoom = await prisma.waitingRoom.create({});
    }
    await prisma.$disconnect();
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization, secret',
        exposedHeaders: 'Content-Disposition',
        maxAge: 86400,
    });
    app.use('/uploads', express.static('/ft_transcendence/src/uploads'));
    await app.listen(4000);
}
async function run() {
    await bootstrap();
    await CreateEsseantialTable();
}
run();
//# sourceMappingURL=main.js.map