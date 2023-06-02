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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChanelResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const chanel_service_1 = require("./chanel.service");
const chanel_entity_1 = require("./entities/chanel.entity");
const create_chanel_input_1 = require("./dto/create-chanel.input");
let ChanelResolver = class ChanelResolver {
    constructor(chanelService) {
        this.chanelService = chanelService;
    }
    createChanel(createChanelInput) {
        return this.chanelService.create(createChanelInput);
    }
    findAll() {
        return this.chanelService.findAll();
    }
    findOne(id) {
        return this.chanelService.findOne(id);
    }
    removeChanel(id) {
        return this.chanelService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => chanel_entity_1.Chanel),
    __param(0, (0, graphql_1.Args)('createChanelInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chanel_input_1.CreateChanelInput]),
    __metadata("design:returntype", void 0)
], ChanelResolver.prototype, "createChanel", null);
__decorate([
    (0, graphql_1.Query)(() => [chanel_entity_1.Chanel], { name: 'chanell' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChanelResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => chanel_entity_1.Chanel, { name: 'chanel' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChanelResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => chanel_entity_1.Chanel),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChanelResolver.prototype, "removeChanel", null);
ChanelResolver = __decorate([
    (0, graphql_1.Resolver)(() => chanel_entity_1.Chanel),
    __metadata("design:paramtypes", [chanel_service_1.ChanelService])
], ChanelResolver);
exports.ChanelResolver = ChanelResolver;
//# sourceMappingURL=chanel.resolver.js.map