import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/user.dto'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post() 
    createUser(@Body() userDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(userDto);
    }
}
