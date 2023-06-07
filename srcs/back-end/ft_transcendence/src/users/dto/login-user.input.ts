import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class LoginUserInput{
    @Field()
    email: string;
    @Field()
    password: string;
}