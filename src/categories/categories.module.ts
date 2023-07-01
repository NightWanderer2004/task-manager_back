import { Module } from '@nestjs/common'
import { CategoriesResolver } from './categories.resolver'
import { CategoriesService } from './categories.service'
import { TasksService } from 'src/tasks/tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { Task } from 'src/tasks/task.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Task]), UsersModule],
  providers: [CategoriesResolver, CategoriesService, TasksService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
