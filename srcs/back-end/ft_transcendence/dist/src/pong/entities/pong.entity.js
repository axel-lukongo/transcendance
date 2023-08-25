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
exports.Pong = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
let Pong = exports.Pong = class Pong {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Pong.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Pong.prototype, "userId1", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Pong.prototype, "userId2", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Pong.prototype, "scoreUser1", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Pong.prototype, "scoreUser2", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Pong.prototype, "loserId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Pong.prototype, "winnerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Pong.prototype, "versusDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Pong.prototype, "start", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Pong.prototype, "user1", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Pong.prototype, "user2", void 0);
exports.Pong = Pong = __decorate([
    (0, graphql_1.ObjectType)()
], Pong);
//# sourceMappingURL=pong.entity.js.map