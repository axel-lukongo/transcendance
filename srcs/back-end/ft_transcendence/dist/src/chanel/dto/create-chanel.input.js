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
exports.CreateChanelInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateChanelInput = class CreateChanelInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateChanelInput.prototype, "owner_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateChanelInput.prototype, "chanel_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateChanelInput.prototype, "chanel_size", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateChanelInput.prototype, "max_users", void 0);
CreateChanelInput = __decorate([
    (0, graphql_1.InputType)()
], CreateChanelInput);
exports.CreateChanelInput = CreateChanelInput;
//# sourceMappingURL=create-chanel.input.js.map