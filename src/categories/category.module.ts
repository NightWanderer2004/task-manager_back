import { Module } from '@nestjs/common'
import { Category } from './category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesResolver } from './categories.resovler'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesResolver],
})
export class CategoriesModule {}
