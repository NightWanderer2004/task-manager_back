import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role, User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } })
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findByRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { role } })
  }

  // async createUser(
  //   id: number,
  //   email: string,
  //   password: string,
  //   role: Role,
  // ): Promise<User> {
  //   const user = this.userRepository.create({ id, email, password, role })
  //   return this.userRepository.save(user)
  // }
}
