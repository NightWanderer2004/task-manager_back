import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/createTask.dto'

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  async createTask(
    @Args('input') input: CreateTaskDto,
    @Args('categoryId') categoryId: number,
  ): Promise<Task> {
    return this.tasksService.createTask(input, categoryId)
  }

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.tasksService.getTasks()
  }

  @Query(() => Task)
  async task(@Args('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }
}
