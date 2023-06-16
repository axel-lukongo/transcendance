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
let ContactsResolver = class ContactsResolver {
    constructor(myService, userService) {
        this.myService = myService;
        this.userService = userService;
    }
    createContact(createContact) {
        if (createContact.user_id == createContact.contact_id)
            throw new Error("Can't add your self");
        return this.myService.createContact(createContact);
    }
    findAllContacts(id) {
        return this.myService.findAllContacts(id);
    }
    findContact(contact) {
        const { contact_id } = contact;
        return this.userService.findOne(contact_id);
    }
};
__decorate([
    (0, graphql_2.Mutation)(() => contact_entity_1.Contact, { name: "createContact" }),
    __param(0, (0, graphql_2.Args)("createContact")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_input_1.CreateContactInput]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "createContact", null);
__decorate([
    (0, graphql_2.Query)(() => [contact_entity_1.Contact], { name: 'contacts' }),
    __param(0, (0, graphql_2.Args)("user_id", { type: () => graphql_2.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "findAllContacts", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_entity_1.User, { name: "contact" }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_entity_1.Contact]),
    __metadata("design:returntype", void 0)
], ContactsResolver.prototype, "findContact", null);
ContactsResolver = __decorate([
    (0, graphql_1.Resolver)(() => contact_entity_1.Contact),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService,
        users_service_1.UsersService])
], ContactsResolver);
exports.ContactsResolver = ContactsResolver;
//# sourceMappingURL=contacts.resolver.js.map