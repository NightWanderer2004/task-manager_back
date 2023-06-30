import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email)
    if (!user) return null

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) return null

    return user
  }

  async login(user: User): Promise<string> {
    const payload = { sub: user.id }
    return this.jwtService.signAsync(payload)
  }
}
