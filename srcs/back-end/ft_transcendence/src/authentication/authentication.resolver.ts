import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthenticationService } from './authentication.service';
import axios, { AxiosResponse } from 'axios';

@Resolver()
export class AuthenticationResolver {

  private intraLogin: string;
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  async createUser(@Args('createAuthenticationInput') createAuthenticationInput: CreateAuthenticationInput) {
    if (this.intraLogin) {
    try {
        const createUserInput: CreateUserInput = { ...createAuthenticationInput, intra_login: this.intraLogin };
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
    let profileResponse: AxiosResponse<any, any> ;
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
    }
    catch (error) {
      throw new Error("42 API is not accessible please try again in a few minutes");
    }
  
    this.intraLogin = profileResponse.data.login;
    const user = await this.authService.findUserByIntraLogin(this.intraLogin);

    if(!user)
      throw new Error("This user does not exist yet");

      return user;
  }
}
