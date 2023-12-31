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
import { saveBase64ToFile } from 'src/utils/upload.utils';




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
      
        let  {avatar, ...restupdateAuthenticationInput} = updateAuthenticationInput;
      // DEFINE THE AVATAR IMG
      avatar = avatar ? 
      'http://localhost:4000/uploads/' + await saveBase64ToFile(avatar, context.req.userId) 
      :
      'http://localhost:4000/uploads/default_avatar.jpg';

        try {
          const updateUserDataInput: UpdateUserInput = {
            ...restupdateAuthenticationInput,
            id:  context.req.userId,
            connection_status: __ACCESS__,
            avatar,
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
        tfa_code: tfa_code,
        connection_status : __NEED_TFA__
      };
      this.mailingService.sendMail(user.email, tfa_code);

      let updateUser= await this.userResolveur.updateUser(updateUserDataInput);
      updateUser.tfa_code = '';
      return updateUser;
    }
    return user;
  }

  @Query(() => User)
  async checkTwoAuthenticationFactor(@Args('code') code: string, 
  @Context() context) {

    const user = await this.userResolveur.findUserById(context.req.userId)

    if (user)
    {
      if (user.tfa_code === code) {
        const updateUserDataInput: UpdateUserInput = {
          id:  context.req.userId,
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



}
