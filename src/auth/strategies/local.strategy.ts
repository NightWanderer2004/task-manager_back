import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { User } from 'src/users/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = this.authService.validateUser(email, password)
    if (!user) throw new UnauthorizedException()
    return user
  }
}
