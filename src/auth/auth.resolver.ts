import { LoginResponse } from './dto/loginResponse.dto'
import { LoginUser } from './dto/loginUser.dto'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { User } from 'src/users/user.entity'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import { Token } from './dto/token.dto'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginUser') loginUser: LoginUser) {
    return this.authService.login(loginUser)
  }

  @Mutation(() => Token)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken)
  }

  @Mutation(() => User)
  async signup(@Args('signupUser') signupUser: CreateUserDto) {
    return this.authService.signup(signupUser)
  }
}
