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
exports.ContactsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const contact_entity_1 = require("./entities/contact.entity");
const contacts_service_1 = require("./contacts.service");
const create_contact_input_1 = require("./dto/create-contact.input");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const update_contact_input_1 = require("./dto/update-contact.input");
const users_resolver_1 = require("../users/users.resolver");
const main_1 = require("../main");
const tobloc_service_1 = require("../messages/tobloc/tobloc.service");
let ContactsResolver = exports.ContactsResolver = class ContactsResolver {
    constructor(contactService, userService, toblocService) {
        this.contactService = contactService;
        this.userService = userService;
        this.toblocService = toblocService;
    }
    async createContact(createContact) {
        if (createContact.user_id == createContact.contact_id)
            throw new Error("Can't add your self");
        try {
            const response = await this.contactService.checkExist(createContact);
            const blocked = await this.toblocService.YourBloc(createContact.user_id, createContact.contact_id);
            if (response)
                throw new Error("impossible");
            else if (blocked) {
                throw new Error("this user blocked you");
            }
            else
                return this.contactService.createContact(createContact);
        }
        catch (error) {
            return error;
        }
    }
    findAllContactsRequest(context) {
        return this.contactService.findContactsRequest(context.req.userId);
    }
    findMyContactRequest(context) {
        console.log(context.req.userId);
        return this.contactService.findMyContactRequest(context.req.userId);
    }
    findContact(contact, context) {
        const { contact_id, user_id } = contact;
        let id = user_id;
        if (context.req.userId == user_id)
            id = contact_id;
        return this.userService.findUserById(id);
    }
    replyInviteContact(reply) {
        return (this.contactService.replyAddContact(reply));
    }
    async deletecontact(user1, user2) {
        return (this.contactService.deleteContact(user1, user2));
    }
    deleteContact(contact_id) {
        return (this.contactService.delete(contact_id));
    }
    getMyContacts(context) {
        return this.contactService.findContacts(context.req.userId);
    }
    changeState(context) {
        return main_1.socket.asyncIterator(users_resolver_1.CHANGE_STATE);
    }
};
__decorate([
    (0, graphql_2.Mutation)(() => contact_entity_1.Contact, { name: "createContact" }),
    __param(0, (0, graphql_2.Args)("createContact")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_input_1.CreateContactInput]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "createContact", null);
__decorate([
    (0, graphql_2.Query)(() => [contact_entity_1.Contact], { name: 'contactsRequest' }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "findAllContactsRequest", null);
__decorate([
    (0, graphql_2.Query)(() => [contact_entity_1.Contact], { name: "myContactRequest" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "findMyContactRequest", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_entity_1.User, { name: "contact" }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_entity_1.Contact, Object]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "findContact", null);
__decorate([
    (0, graphql_2.Mutation)(() => contact_entity_1.Contact, { name: "replyAddContact" }),
    __param(0, (0, graphql_2.Args)("reply")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_contact_input_1.UpdateContact]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "replyInviteContact", null);
__decorate([
    (0, graphql_2.Mutation)(() => contact_entity_1.Contact, { name: "deletecontact" }),
    __param(0, (0, graphql_2.Args)("user1")),
    __param(1, (0, graphql_2.Args)("user2")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ContactsResolver.prototype, "deletecontact", null);
__decorate([
    (0, graphql_2.Mutation)(() => contact_entity_1.Contact, { name: "deleteContact" }),
    __param(0, (0, graphql_2.Args)("id", { type: () => graphql_2.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "deleteContact", null);
__decorate([
    (0, graphql_2.Query)(() => [contact_entity_1.Contact], { name: "myContacts" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "getMyContacts", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_entity_1.User, {
        name: 'changeState',
        filter: async function (payload, variables, context) {
            try {
                const resolve_payload = await payload;
                if (resolve_payload.changeState.id == context.token.userId)
                    return false;
                let user_contact = await this.contactService.findContacts(context.token.userId);
                let need_to_catch = user_contact.some((contact) => (contact.user_id === resolve_payload.changeState.id || contact.contact_id === resolve_payload.changeState.id));
                return need_to_catch;
            }
            catch (e) {
                console.log('Error: ', e);
                return false;
            }
        }
    }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "changeState", null);
exports.ContactsResolver = ContactsResolver = __decorate([
    (0, graphql_1.Resolver)(() => contact_entity_1.Contact),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService,
        users_service_1.UsersService,
        tobloc_service_1.ToblocService])
], ContactsResolver);
//# sourceMappingURL=contacts.resolver.js.map