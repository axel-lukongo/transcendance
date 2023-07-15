import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthenticationService } from './authentication.service';
import { UsersService } from 'src/users/users.service';
import axios, { AxiosResponse } from 'axios';
import { MailingService } from './mailing/mailing.service';

import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path'
import { UpdateUserInput } from 'src/users/dto/update-user.input';


const generateTwoFactorCode = (): string => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  return code;
};

async function saveBase64ToFile(base64Link: string, userId: number): Promise<string> {
  const base64Data = base64Link.split(';base64,').pop() || '';
  const binaryData = Buffer.from(base64Data, 'base64');
  
  const fileExtension = base64Link.split('/')[1].split(';')[0]; // Obtenez l'extension du fichier à partir du lien base64
  
  const fileName = `avatar_${userId}.${fileExtension}`; // Nom du fichier avec l'identifiant de l'utilisateur et l'extension
  const uploadPath = '/ft_transcendence/src/uploads';
  const filePath = path.join(uploadPath, fileName);
  
  fs.writeFileSync(filePath, binaryData);
  
  return filePath;
}

@Resolver()
export class AuthenticationResolver {

  private intraLogin: string;
  private email: string;
  private user: User;
  constructor(
    private readonly authService: AuthenticationService, 
    private readonly userService: UsersService,
    private readonly mailingService: MailingService) {}


  @Mutation(() => User)
  async createUser(@Args('createAuthenticationInput') createAuthenticationInput: CreateAuthenticationInput) {
    if (this.intraLogin && this.email) {
    try {
      const { avatar, ...rest } = createAuthenticationInput;
      
      const createUserInput: CreateUserInput = { ...rest, intra_login: this.intraLogin, email: this.email };
      let  userCreated = await this.authService.create(createUserInput);
      
      const filePath = avatar ? await saveBase64ToFile(avatar, userCreated.id) : '/ft_transcendence/src/uploads/default_avatar.jpg'
      
      console.log(filePath);
      
      const updateData: UpdateUserInput = { 
        id : userCreated.id,
        avatar: filePath 
      };
      return await this.userService.update(userCreated.id, updateData);
      } 
      catch (error) {
        throw new Error("createUser Error: " + error);
      } 
    }
    else {
      throw new Error("You must first authenticate via the API of 42 to create an user");
    }
  } 

  @Query(() => User, { name: 'makeAuthentication' })
  async makeAuthentication(@Args('code') code: string) {
    let profileResponse: AxiosResponse<any, any>;
    try {
      const response = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.CLIENT_ID_42_API,
        client_secret: process.env.CLIENT_SECRET_42_API,
        redirect_uri: process.env.WEBSITE_URL,
      });
      
      const access_token = response.data.access_token;
      profileResponse = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    } catch (error) {
      return { error: "42 API is not accessible. Please try again in a few minutes." };
    }

    this.intraLogin = profileResponse.data.login;
    this.email = profileResponse.data.email;
    this.user = await this.authService.findUserByIntraLogin(this.intraLogin);

    if (!this.user) {
      throw new Error("This user does not exist yet");
      // return { message: "This user does not exist yet" };
    } 
    else if (this.user.tfa_code) {
      const tfa_code = generateTwoFactorCode();
      const updatedUser = await this.userService.update(this.user.id, {id : this.user.id, tfa_code });
      this.mailingService.sendMail(this.user.email, tfa_code);
      this.user = updatedUser;
      throw new Error("To complete authentication, 2FA verification is required")
      // return { error: "To complete authentication, 2FA verification is required" };
      }
    return this.user;
  }

  @Query(() => User)
  async checkTwoAuthenticationFactor(@Args('code') code: string) {
    if (this.user && this.user.tfa_code === code) {
      return this.user;
    } 
    else {
      throw new Error('Invalid two-factor authentication code');
    }
  }
}
