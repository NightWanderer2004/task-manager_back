import { Module } from '@nestjs/common'
import { TasksResolver } from './tasks.resolver'
import { TasksService } from './tasks.service'
import { CategoriesService } from 'src/categories/categories.service'
import { Task } from './task.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/categories/category.entity'
import { UsersModule } from 'src/users/users.module'
import { CategoriesModule } from 'src/categories/categories.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Category]),
    UsersModule,
    CategoriesModule,
  ],
  providers: [TasksResolver, TasksService, CategoriesService],
  exports: [TasksService],
})
export class TasksModule {}
