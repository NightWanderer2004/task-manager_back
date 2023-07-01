import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { User } from './user.entity'
// import { UseGuards } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'
import { CreatUserDto } from './dto/createUser.dto'

@Resolver(() => User)
// @UseGuards(AuthGuard('jwt'))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.getUsers()
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserDto') createUserDto: CreatUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserDto)
  }
}
