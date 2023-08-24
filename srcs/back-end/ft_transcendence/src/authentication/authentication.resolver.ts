import { Resolver, Query, Mutation, Args, Context, Int,  } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthenticationService, __ACCESS__, __CONNECTED__, __DISCONNECTED__, __NEED_TFA__ } from './authentication.service';
import { MailingService } from './mailing/mailing.service';
import { generateTwoFactorCode } from 'src/utils/auth.utils';
import axios, { AxiosResponse } from 'axios';
import { UpdateAuthenticationInput } from './dto/update-authentication.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { UsersResolver } from 'src/users/users.resolver';




@Resolver()
export class AuthenticationResolver {
  
  constructor(
    private readonly authService: AuthenticationService, 
    private readonly userResolveur: UsersResolver,
    private readonly mailingService: MailingService) {}


  @Mutation(() => User)
  async createUser (
    @Args('updateAuthenticationInput')updateAuthenticationInput:UpdateAuthenticationInput,
    @Context() context) {
      if (context.req.userId)
      {
        try {
          const updateUserDataInput: UpdateUserInput = {
            ...updateAuthenticationInput,
            id:  context.req.userId,
            connection_status: __ACCESS__,
            state: __CONNECTED__,
          };
           return await this.userResolveur.updateUser(updateUserDataInput);
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

    // GET INFO FROM 42 API
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

    //SEARCH THE USER
    let user = await this.authService.findUserByEmail(profileResponse.data.email);

    // CREATE USER
    if (!user) { 
      const createUserInput: CreateUserInput = {
        email: profileResponse.data.email,
        nickname: profileResponse.data.login
       };
       const create_user = await this.authService.create(createUserInput);
       return create_user;
    } 
    else if (user.tfa_code) {
      const tfa_code = generateTwoFactorCode();
      const updateUserDataInput: UpdateUserInput = {
        id: user.id,
        tfa_code: code,
        connection_status : __NEED_TFA__
      };
      this.mailingService.sendMail(user.email, tfa_code);
      return this.userResolveur.updateUser(updateUserDataInput);
    }
    return user;
  }

  @Query(() => User)
  async checkTwoAuthenticationFactor(@Args('code') code: string, 
  @Context() context) {

    const user = await this.userResolveur.findUserById(context.token.userId)

    if (!user)
    {
      if (user.tfa_code === code) {
        const updateUserDataInput: UpdateUserInput = {
          id:  context.token.userId,
          connection_status: __ACCESS__,
          state: __CONNECTED__,
          tfa_code : 'true'
        };
        return await this.userResolveur.updateUser(updateUserDataInput)
      } 
      else {
        throw new Error('Invalid two-factor authentication code');
      }
    }
    else {
      throw new Error('User does not found');
    }
  }

  @Mutation(() => User, {name: "updateState"})
  async updateState(
    @Args("new_state", { type: () => Int }) new_state: number,
    @Context() context: any
  ) {
    if (new_state < 1 || new_state > 3)
    {
      throw new Error("Unrecognized state");
    }
    const updateUserDataInput: UpdateUserInput = {
      id:  context.req.userId,
      state: new_state
    };
    return await this.userResolveur.updateUser(updateUserDataInput);

  }

}
