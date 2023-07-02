import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/createTask.dto'
import { Category } from 'src/categories/category.entity'

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(input)
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: number,
    @Args('input') input: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, input)
  }

  @Mutation(() => Task)
  async deleteTask(@Args('id') id: number): Promise<Task> {
    return this.tasksService.deleteTask(id)
  }

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.tasksService.getTasks()
  }

  @ResolveField()
  async category(@Parent() task: Task): Promise<Category> {
    return await this.tasksService.getCategoryId(task.taskId)
  }
}
