import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersResolver } from './users.resolver'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { Category } from 'src/categories/category.entity'
import { CategoriesService } from 'src/categories/categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [UsersResolver, UsersService, CategoriesService],
  exports: [UsersService],
})
export class UsersModule {}
