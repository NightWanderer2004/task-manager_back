import { Resolver, Query } from 'type-graphql'
import { Task } from './task.entity'
import { getRepository } from 'typeorm'

@Resolver(() => Task)
export class TasksResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    const tasksRepository = getRepository(Task)
    return await tasksRepository.find()
  }
}
