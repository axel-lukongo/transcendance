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
exports.UpdateChanelUserInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const add_user_chanel_input_1 = require("./add-user-chanel.input");
let UpdateChanelUserInput = exports.UpdateChanelUserInput = class UpdateChanelUserInput extends (0, graphql_1.PartialType)(add_user_chanel_input_1.AddUserChanel) {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateChanelUserInput.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateChanelUserInput.prototype, "chanel_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateChanelUserInput.prototype, "is_muted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateChanelUserInput.prototype, "is_admin", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateChanelUserInput.prototype, "mute_start_time", void 0);
exports.UpdateChanelUserInput = UpdateChanelUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateChanelUserInput);
//# sourceMappingURL=update-chanel-user.input.js.map