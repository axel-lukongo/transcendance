import { PrismaService } from "./prisma.service";

const prisma = new PrismaService();

async function main() {
	
	for(let i = 0; i < 10; i++) {
		const data = {
			email: "test_" + i,
			nickname: "asimon_" + i,
			token: "0" + i,
			intra_login: "asimon_" + i
		}

		await prisma.user.upsert({
			where: { nickname: data.nickname },
			update: {},
			create: {
				nickname: data.nickname,
				email: data.email,
				token: data.token,
				intra_login: data.intra_login
			}
		})
	}

	for(let i = 2; i < 10; i++) {

		await prisma.contact.upsert({
			where: { user_id_contact_id: {
				user_id:1,
				contact_id: i
			}},
			update: {},
			create: {
				user_id: 1,
				contact_id: i
			}
		})
	}
}

main().catch((e) => {
	console.log(e);
	process.exit(1);
})