import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/createUser.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } })
  }

  async getById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } })
  }

  async createUser(input: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(input)
    return this.userRepository.save(user)
  }
}
