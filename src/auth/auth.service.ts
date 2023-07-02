import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { JwtService } from '@nestjs/jwt'
import { LoginResponse } from './dto/loginResponse.dto'
import { LoginUser } from './dto/loginUser.dto'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getByEmail(email)
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (isPasswordMatch) {
        const { password, ...rest } = user
        return rest
      }
    }
    return null
  }

  async login(loginUser: LoginUser): Promise<LoginResponse | null> {
    const user = await this.usersService.getByEmail(loginUser.email)
    if (user) {
      const { password, ...rest } = user
      return {
        token: this.jwtService.sign({ email: user.id, sub: user.id }),
        user: rest,
      }
    }
    return null
  }

  async signup(signupUser: CreateUserDto): Promise<User | null> {
    const user = await this.usersService.getByEmail(signupUser.email)
    if (user) throw new Error('User already exists')

    const password = await bcrypt.hash(signupUser.password, 10)

    return this.usersService.createUser(signupUser)
  }
}
