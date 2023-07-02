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
  ): Promise<Category> {
    return await this.categoriesService.createCategory(input)
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: number,
    @Args('input') input: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, input)
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number): Promise<Category> {
    return await this.categoriesService.deleteCategory(id)
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.getCategories()
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
