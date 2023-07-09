import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/createUser.dto'
import { Category } from 'src/categories/category.entity'
import { CategoriesService } from 'src/categories/categories.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoryService: CategoriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.usersService.getUsers()
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return await this.usersService.getById(id)
  }

  @ResolveField(() => [Category])
  async categories(@Parent() user: User): Promise<Category[]> {
    return await this.categoryService.getByUserId(user.id)
  }

  @Mutation(() => User)
  async createUser(@Args('input') createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto)
  }
}
