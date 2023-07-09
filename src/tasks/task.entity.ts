import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Category } from '../categories/category.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  name: string

  @Column({ type: 'date', nullable: true })
  @Field()
  dateStart: string

  @Column({ type: 'date', nullable: true })
  @Field()
  dateEnd: string

  @Column()
  @Field()
  taskId: number

  @ManyToOne(() => Category, (category) => category.tasks)
  @Field(() => Category)
  category: Category
}
