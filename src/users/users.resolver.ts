import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { User } from './user.entity'
// import { UseGuards } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'
import { CreatUserDto } from './dto/createUser.dto'
import { Category } from 'src/categories/category.entity'
import { CategoriesService } from 'src/categories/categories.service'

@Resolver(() => User)
// @UseGuards(AuthGuard('jwt'))
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.usersService.getUsers()
  }

  @ResolveField(() => [Category])
  async categories(@Parent() user: User): Promise<Category[]> {
    return await this.categoryService.getByUserId(user.id)
  }

  @Mutation(() => User)
  async createUser(@Args('input') createUserDto: CreatUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto)
  }
}
