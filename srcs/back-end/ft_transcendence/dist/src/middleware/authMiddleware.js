"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthMiddleware = exports.AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        var _a, _b;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const isMakeAuthenticationRequest = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.operationName) === 'MakeAuthentication';
        const isGraphql = (req.url === '/graphql');
        if (!isMakeAuthenticationRequest) {
            if (!token) {
                res.status(401).json({ message: 'Token manquant' });
                return;
            }
            async function check() {
                try {
                    const prisma = new prisma_service_1.PrismaService();
                    const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.CLIENT_SECRET_BACKEND);
                    const user = await prisma.user.findUnique({
                        where: { token }
                    });
                    await prisma.$disconnect();
                    if (!user)
                        throw new Error('error');
                    req.userId = decodedToken.userId;
                    next();
                }
                catch (error) {
                    console.log('error', error);
                    res.status(401).json({ message: 'Token invalide' });
                }
            }
            check();
        }
        else
            next();
    }
};
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=authMiddleware.js.map