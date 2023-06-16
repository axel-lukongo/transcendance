import { CreateContactInput } from "./create-contact.input";
declare const UpdateContact_base: import("@nestjs/common").Type<Partial<CreateContactInput>>;
export declare class UpdateContact extends UpdateContact_base {
    id: number;
    pending: boolean;
}
export {};
