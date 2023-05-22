import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto} from '../dto/user.dto'
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class UserService {
  constructor(private readonly  prsm: PrismaClient) {}

  async getUserByNickname(nick: string): Promise<any> {
    return new Promise ((resolve, reject) => {
        this.prsm.user
            .findUnique({
                where: { nickname: nick}
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
  }

  async createUser(userDto: CreateUserDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prsm.user
        .create({
          data: userDto,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
  
  async deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
    this.prsm.user
        .delete({ 
            where: { id } 
        })
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
  //   async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
      //     return this.prsm.user.update({ where: { id }, data: userData });
      //   }
      
        
}