import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Category } from './category.entity'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { TasksService } from '../tasks/tasks.service'
import { Task } from '../tasks/task.entity'
import { User } from 'src/users/user.entity'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard'

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly tasksService: TasksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: number,
    @Args('input') input: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number): Promise<Category> {
    return await this.categoriesService.deleteCategory(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.getCategories()
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Category)
  async category(@Args('id') id: number): Promise<Category> {
    return await this.categoriesService.getById(id)
  }

  @ResolveField(() => User)
  async user(@Parent() category: Category): Promise<User> {
    return await this.categoriesService.getUserId(category.userId)
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() category: Category): Promise<Task[]> {
    return await this.tasksService.getByCategoryId(category.id)
  }
}
