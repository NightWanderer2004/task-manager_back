import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/createTask.dto'
import { CategoriesService } from 'src/categories/categories.service'
import { UsersService } from 'src/users/users.service'
import { Category } from 'src/categories/category.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find()
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } })
  }

  async getTaskByCategoryId(categoryId: number): Promise<Category> {
    return this.categoriesService.getCategoryById(categoryId)
  }

  async getTasksByCategoryId(categoryId: number): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .where('task.categoryId = :categoryId', { categoryId })
      .getMany()
  }

  async createTask(input: CreateTaskDto, categoryId: number): Promise<Task> {
    const task = this.taskRepository.create({
      ...input,
      taskId: categoryId,
    })
    return this.taskRepository.save(task)
  }
}
