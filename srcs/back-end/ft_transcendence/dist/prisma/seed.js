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
            intra_login: "asimon_" + i
        };
        await prisma.user.upsert({
            where: { nickname: data.nickname },
            update: {},
            create: {
                nickname: data.nickname,
                email: data.email,
                token: data.token,
                intra_login: data.intra_login,
                state: authentication_service_1.__CONNECTED__
            }
        });
    }
    for (let i = 1; i < N_CONTACT + 1; i++) {
        await prisma.contact.upsert({
            where: { user_id_contact_id: {
                    user_id: 1,
                    contact_id: i
                } },
            update: {},
            create: {
                user_id: 1,
                contact_id: i
            }
        });
    }
    for (let i = 1; i < N_CHANEL + 1; i++) {
        await prisma.chanel.upsert({
            where: { id: i },
            update: {},
            create: {
                chanel_name: "toto_" + i,
                chanel_size: i * 2,
                max_users: i * 4,
                owner_id: i
            }
        });
    }
    const USER_TO_ADD = {
        user1: 1
    };
    const CHANEL_TO_ADD = {
        chanel1: 1
    };
    for (let i = 1; i < N_CHANEL_USER + 1; i++) {
        await prisma.users_Chanels.upsert({
            where: {
                user_id_chanel_id: {
                    user_id: USER_TO_ADD.user1,
                    chanel_id: i
                }
            },
            update: {},
            create: {
                user_id: USER_TO_ADD.user1,
                chanel_id: i,
                pending: true
            }
        });
    }
}
main().catch((e) => {
    console.log(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map