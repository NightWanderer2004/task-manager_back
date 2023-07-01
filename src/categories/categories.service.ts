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

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } })
  }

  async getCategoryByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { name } })
  }

  async getUserId(userId: number): Promise<User> {
    return this.usersService.findById(userId)
  }

  async createCategory(input: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(input)
    return this.categoryRepository.save(category)
  }
}
