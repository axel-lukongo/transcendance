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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ContactsService = exports.ContactsService = class ContactsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createContact(createContact) {
        return this.prisma.contact.create({ data: createContact });
    }
    delete(contact_id) {
        return (this.prisma.contact.delete({ where: { id: contact_id } }));
    }
    async deleteContact(user1, user2) {
        const the_contact = await this.prisma.contact.findFirst({
            where: {
                OR: [
                    {
                        user_id: user1,
                        contact_id: user2,
                    },
                    {
                        user_id: user2,
                        contact_id: user1,
                    },
                ],
            },
        });
        if (the_contact) {
            return this.prisma.contact.delete({ where: { id: the_contact.id } });
        }
        else {
            return null;
        }
    }
    findContactsRequest(id) {
        return this.prisma.contact.findMany({
            where: {
                contact_id: id,
                NOT: {
                    pending: false
                }
            }
        });
    }
    findMyContactRequest(id) {
        return this.prisma.contact.findMany({
            where: {
                user_id: id,
                NOT: {
                    pending: false
                }
            }
        });
    }
    replyAddContact(reply) {
        return this.prisma.contact.update({
            where: { id: reply.id },
            data: reply
        });
    }
    findContacts(user_id) {
        return this.prisma.contact.findMany({
            where: {
                OR: [
                    { user_id: user_id },
                    { contact_id: user_id }
                ],
                NOT: {
                    pending: true
                }
            }
        });
    }
    checkExist(createContact) {
        return this.prisma.contact.findUnique({
            where: {
                user_id_contact_id: {
                    user_id: createContact.contact_id,
                    contact_id: createContact.user_id
                }
            }
        });
    }
};
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map