import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'
import { JwtService } from '@nestjs/jwt'
import { LoginResponse } from './dto/loginResponse.dto'
import { LoginUser } from './dto/loginUser.dto'
import { CreateUserDto } from 'src/users/dto/createUser.dto'
import * as bcrypt from 'bcryptjs'
import { Token } from './dto/token.dto'

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

  async refreshToken(refreshToken: string): Promise<Token | null> {
    const user = this.verifyRefreshToken(refreshToken)
    if (!user) throw new Error('Invalid refresh token')

    const accessToken = this.generateAccessToken(user)
    const newRefreshToken = this.generateRefreshToken(user)

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: this.jwtService.decode(accessToken)['exp'],
    }
  }

  private verifyRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verify(refreshToken)
    } catch (error) {
      console.error(error)
    }
  }

  private generateAccessToken(user: User) {
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.sign(payload, { expiresIn: '1h' })
  }

  private generateRefreshToken(user: User) {
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.sign(payload, { expiresIn: '1d' })
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
    signupUser.password = password

    return this.usersService.createUser(signupUser)
  }
}
