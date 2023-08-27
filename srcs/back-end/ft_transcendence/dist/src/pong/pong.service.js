"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PongService = exports.PongService = class PongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPongInput) {
        return this.prisma.pong.create({
            data: createPongInput
        });
    }
    findAll() {
        return this.prisma.pong.findMany({});
    }
    findUnique(id) {
        return this.prisma.pong.findUnique({ where: { id } });
    }
    async findCurrentGame(userId) {
        const game = await this.prisma.pong.findFirst({
            where: {
                OR: [
                    { userId1: userId },
                    { userId2: userId },
                ],
            },
            orderBy: {
                versusDate: 'desc',
            },
        });
        return game;
    }
    async myMatchStatistic(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        const leaderBoard = await this.leaderBoard();
        const userStatistics = leaderBoard.find(player => player.nickname === user.nickname);
        return userStatistics || null;
    }
    async myMatchHistory(userId) {
        try {
            const games = await this.prisma.pong.findMany({
                where: {
                    OR: [
                        { userId1: userId },
                        { userId2: userId },
                    ],
                },
                include: {
                    user1: true,
                    user2: true,
                },
            });
            if (games.length === 0) {
                throw new Error('No game found for the given userId.');
            }
            return games;
        }
        catch (error) {
            throw new Error(`Error fetching game: ${error.message}`);
        }
    }
    async calculateStat(user) {
        const totalGames = await this.prisma.pong.findMany({
            where: {
                OR: [
                    { userId1: user.id },
                    { userId2: user.id },
                ],
            },
        });
        let wins = 0;
        let defeats = 0;
        totalGames.forEach(game => {
            if (game.winnerId === user.id) {
                wins++;
            }
            else if (game.loserId === user.id) {
                defeats++;
            }
        });
        const totalMatches = wins + defeats;
        const ratio = totalMatches === 0 ? 0 : wins / totalMatches;
        return { wins, defeats, ratio };
    }
    async leaderBoard() {
        const allUsers = await this.prisma.user.findMany({});
        const usersWithStats = await Promise.all(allUsers.map(async (user) => ({
            user,
            stat: await this.calculateStat(user),
        })));
        const sortedUsers = usersWithStats.sort((a, b) => {
            if (a.user.level !== b.user.level) {
                return b.user.level - a.user.level;
            }
            else if (a.stat.wins !== b.stat.wins) {
                return b.stat.wins - a.stat.wins;
            }
            else {
                return a.user.nickname.localeCompare(b.user.nickname);
            }
        });
        let currentGrade = 1;
        let level = 1;
        let win = 1;
        const leaderBoard = sortedUsers.map((userWithStats, index) => {
            if (userWithStats.user.level !== level || userWithStats.stat.wins !== win) {
                level = userWithStats.user.level;
                win = userWithStats.stat.wins;
                currentGrade = index === 0 ? 1 : currentGrade + 1;
            }
            return {
                grade: currentGrade,
                nickname: userWithStats.user.nickname,
                level: userWithStats.user.level,
                rank: userWithStats.user.rank,
                wins: userWithStats.stat.wins,
                defeats: userWithStats.stat.defeats,
                ratio: userWithStats.stat.ratio
            };
        });
        return leaderBoard;
    }
    update(id, updatePongInput) {
        return this.prisma.pong.update({
            where: { id },
            data: updatePongInput
        });
    }
    remove(id) {
        return `This action removes a #${id} pong`;
    }
};
exports.PongService = PongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PongService);
//# sourceMappingURL=pong.service.js.map