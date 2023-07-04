import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthenticationService } from './authentication.service';
import axios, { AxiosResponse } from 'axios';
import { UsersService } from 'src/users/users.service';
import { generateTwoFactorCode, sendTwoFactorCodeByEmail} from 'src/utils/auth.utils';

@Resolver()
export class AuthenticationResolver {

  private intraLogin: string;
  private email: string;
  private user: User;
  constructor(private readonly authService: AuthenticationService, private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createAuthenticationInput') createAuthenticationInput: CreateAuthenticationInput) {
    if (this.intraLogin && this.email) {
    try {
        const createUserInput: CreateUserInput = { ...createAuthenticationInput, intra_login: this.intraLogin, email: this.email };
        return await this.authService.create(createUserInput);
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
        client_id: process.env.CLIENT_ID_API_42,
        client_secret: process.env.CLIENT_SECRET_API_42,
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
      sendTwoFactorCodeByEmail(tfa_code, this.user.email);
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
