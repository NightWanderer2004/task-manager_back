import { Resolver, Query } from 'type-graphql'
import { Category } from './category.entity'
import { getRepository } from 'typeorm'

@Resolver(() => Category)
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const categoryRepository = getRepository(Category)
    return await categoryRepository.find()
  }
}
