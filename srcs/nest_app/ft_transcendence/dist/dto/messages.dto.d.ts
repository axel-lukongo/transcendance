export declare class CreateMessageDto {
    sender_id: number;
    user_receiver_id: number;
    chan_receiver_id: number;
    content: string;
}
declare const UpdateMessageDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMessageDto>>;
export declare class UpdateMessageDto extends UpdateMessageDto_base {
}
export {};
