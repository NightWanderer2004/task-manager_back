import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Category } from 'src/categories/category.entity'

export type Role = 'admin' | 'user'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  email: string

  @Column()
  @Field({ nullable: true })
  password?: string

  @Column()
  @Field()
  role: Role

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category])
  categories: Category[]
}
