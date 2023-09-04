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
exports.MessagesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const messages_entity_1 = require("./entities/messages.entity");
const messages_service_1 = require("./messages.service");
const create_messages_input_1 = require("./dto/create-messages.input");
const update_message_input_1 = require("./dto/update-message.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
const NEW_MSG = 'addMessage';
let MessagesResolver = exports.MessagesResolver = class MessagesResolver {
    constructor(msgService) {
        this.msgService = msgService;
    }
    findAll_msg() {
        return this.msgService.findAll_msg();
    }
    async findAll_msg_chan(channelId, context) {
        return this.msgService.findAll_msg_chan(channelId, context.req.userId);
    }
    findOne_msg(id) {
        return this.msgService.findOne_msg(id);
    }
    async createMessage(createMsgInput, context) {
        const userId = context.req.userId;
        const isMuted = await this.msgService.isUserMutedInChannel(userId, createMsgInput.channel_id);
        if (isMuted === true) {
            return (' you are muted');
        }
        const new_message = this.msgService.create(createMsgInput);
        pubSub.publish(NEW_MSG, {
            addmessage: new_message,
        });
        return new_message;
    }
    updateMessage(MsgInput) {
        return this.msgService.update(MsgInput.id, MsgInput);
    }
    deleteMessage(id) {
        return this.msgService.delete(id);
    }
    addmessage(channel_id) {
        return pubSub.asyncIterator(NEW_MSG);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [messages_entity_1.Message], { name: 'Message_findAll_msg' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "findAll_msg", null);
__decorate([
    (0, graphql_1.Query)(() => [messages_entity_1.Message], { name: 'Message_findAll_msg_chan' }),
    __param(0, (0, graphql_1.Args)('channelId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "findAll_msg_chan", null);
__decorate([
    (0, graphql_1.Query)(() => messages_entity_1.Message, { name: 'Message_findOne_msg' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "findOne_msg", null);
__decorate([
    (0, graphql_1.Mutation)(() => messages_entity_1.Message),
    __param(0, (0, graphql_1.Args)('createMsgInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_messages_input_1.CreateMessageInput, Object]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "createMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => messages_entity_1.Message),
    __param(0, (0, graphql_1.Args)("updateMsgInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_input_1.UpdateMessageInput]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "updateMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => messages_entity_1.Message),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "deleteMessage", null);
__decorate([
    (0, graphql_1.Subscription)(() => messages_entity_1.Message, {
        filter: async (payload, variables) => {
            const resolvedPayload = await payload.addmessage;
            return resolvedPayload.channel_id === variables.channel_id;
        }
    }),
    __param(0, (0, graphql_1.Args)('channel_id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "addmessage", null);
exports.MessagesResolver = MessagesResolver = __decorate([
    (0, graphql_1.Resolver)(() => messages_entity_1.Message),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesResolver);
//# sourceMappingURL=messages.resolver.js.map