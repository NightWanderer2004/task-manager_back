import { Resolver, Query } from 'type-graphql'
import { User } from './user.entity'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'

@Resolver(() => User)
// @UseGuards(AuthGuard('jwt'))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll()
  }
}
