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
exports.BallResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ball_service_1 = require("./ball.service");
const ball_entity_1 = require("./entities/ball.entity");
const update_ball_input_1 = require("./dto/update-ball.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
const BALL_UPDATE_EVENT = 'ballUp';
let BallResolver = exports.BallResolver = class BallResolver {
    constructor(ballService) {
        this.ballService = ballService;
    }
    createBall() {
        return this.ballService.create();
    }
    findAll() {
        return this.ballService.findAll();
    }
    findUnique(id) {
        return this.ballService.findUnique(id);
    }
    removeBall(id) {
        return this.ballService.remove(id);
    }
    updateBall(updateBallInput) {
        const ballUp = this.ballService.update(updateBallInput.id, updateBallInput);
        pubSub.publish(BALL_UPDATE_EVENT, {
            ballUpdatedSubscription: ballUp,
        });
        return ballUp;
    }
    ballUpdatedSubscription(id) {
        return pubSub.asyncIterator(BALL_UPDATE_EVENT);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => ball_entity_1.Ball),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "createBall", null);
__decorate([
    (0, graphql_1.Query)(() => [ball_entity_1.Ball], { name: 'findBalls' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => ball_entity_1.Ball, { name: 'findBall' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "findUnique", null);
__decorate([
    (0, graphql_1.Mutation)(() => ball_entity_1.Ball),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "removeBall", null);
__decorate([
    (0, graphql_1.Mutation)(() => ball_entity_1.Ball),
    __param(0, (0, graphql_1.Args)('updateBallInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ball_input_1.UpdateBallInput]),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "updateBall", null);
__decorate([
    (0, graphql_1.Subscription)(() => ball_entity_1.Ball, {
        filter: async (payload, variables) => {
            const resolvedPayload = await payload.ballUpdatedSubscription;
            return resolvedPayload.id === variables.id;
        }
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BallResolver.prototype, "ballUpdatedSubscription", null);
exports.BallResolver = BallResolver = __decorate([
    (0, graphql_1.Resolver)(() => ball_entity_1.Ball),
    __metadata("design:paramtypes", [ball_service_1.BallService])
], BallResolver);
//# sourceMappingURL=ball.resolver.js.map