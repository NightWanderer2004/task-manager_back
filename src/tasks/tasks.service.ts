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

  async getByCategoryId(taskId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { taskId } })
  }

  async getCategoryId(categoryId: number): Promise<Category> {
    return this.categoriesService.getById(categoryId)
  }

  async createTask(input: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(input)
    return this.taskRepository.save(task)
  }

  async updateTask(id: number, input: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } })
    task.name = input.name
    task.dateStart = input.dateStart
    task.dateEnd = input.dateEnd
    return this.taskRepository.save(task)
  }

  async deleteTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } })
    return this.taskRepository.remove(task)
  }
}
