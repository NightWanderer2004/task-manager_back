import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TasksResolver } from './tasks.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksResolver],
})
export class TasksModule {}