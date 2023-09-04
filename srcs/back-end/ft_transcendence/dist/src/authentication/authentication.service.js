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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = exports.__IN_GAME__ = exports.__DISCONNECTED__ = exports.__AFK__ = exports.__CONNECTED__ = exports.__ACCESS__ = exports.__NEED_TFA__ = exports.__CREATING__ = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_utils_1 = require("../utils/auth.utils");
exports.__CREATING__ = -2;
exports.__NEED_TFA__ = -1;
exports.__ACCESS__ = 1;
exports.__CONNECTED__ = 1;
exports.__AFK__ = 2;
exports.__DISCONNECTED__ = 3;
exports.__IN_GAME__ = 4;
let AuthenticationService = exports.AuthenticationService = class AuthenticationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserInput) {
        let { avatar } = createUserInput, restCreateUserInput = __rest(createUserInput, ["avatar"]);
        try {
            const user = await this.prisma.user.create({
                data: Object.assign(Object.assign({}, restCreateUserInput), { state: exports.__CONNECTED__, connection_status: exports.__CREATING__ })
            });
            const token = (0, auth_utils_1.generateAccessToken)(user.id);
            const updatedUser = this.prisma.user.update({
                where: { id: user.id },
                data: {
                    token
                }
            });
            return updatedUser;
        }
        catch (error) {
            console.log(error);
            throw new Error("Échec de la création de l'utilisateur.");
        }
    }
    async findUserByEmail(email) {
        let user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            const token = (0, auth_utils_1.generateAccessToken)(user.id);
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    token,
                    state: exports.__CONNECTED__,
                    connection_status: exports.__ACCESS__
                },
            });
        }
        return user;
    }
};
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map