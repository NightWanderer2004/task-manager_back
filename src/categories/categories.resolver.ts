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

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly tasksService: TasksService,
  ) {}

  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryDto,
    // @Args('userId') userId: number,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(input /*userId*/)
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.getCategories()
  }

  @ResolveField(() => User)
  async user(@Parent() category: Category): Promise<User> {
    const { userId } = category
    return await this.categoriesService.getUserId(userId)
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() category: Category): Promise<Task[]> {
    const { id } = category
    return await this.tasksService.getTasksByCategoryId(id)
  }
}
