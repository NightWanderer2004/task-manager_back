import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'
import { CreateCategoryDto } from './dto/createCategory.dto'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/user.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly usersService: UsersService,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async getById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } })
  }

  async getByUserId(userId: number): Promise<Category[]> {
    return this.categoryRepository.find({ where: { userId } })
  }

  async getUserId(userId: number): Promise<User> {
    return this.usersService.getById(userId)
  }

  async createCategory(input: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(input)
    return this.categoryRepository.save(category)
  }

  async updateCategory(
    id: number,
    input: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } })
    category.name = input.name
    category.dateCreated = input.dateCreated
    return this.categoryRepository.save(category)
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } })
    return this.categoryRepository.remove(category)
  }
}
