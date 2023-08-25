"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_service_1 = require("../src/authentication/authentication.service");
const prisma_service_1 = require("./prisma.service");
const prisma = new prisma_service_1.PrismaService();
async function main() {
    const N_USER = 10;
    const N_CONTACT = 10;
    const N_CHANEL = 10;
    const N_CHANEL_USER = 10;
    for (let i = 0; i < N_USER + 1; i++) {
        const data = {
            email: "test_" + i,
            nickname: "asimon_" + i,
            token: "0" + i,
        };
        await prisma.user.upsert({
            where: { nickname: data.nickname },
            update: {},
            create: {
                nickname: data.nickname,
                email: data.email,
                token: data.token,
                state: authentication_service_1.__CONNECTED__,
                connection_status: authentication_service_1.__ACCESS__,
            }
        });
    }
}
main().catch((e) => {
    console.log(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map