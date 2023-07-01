import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Category } from '../categories/category.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  //   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  //   createdAt: Date

  //   @Column({ type: 'timestamp', nullable: true })
  //   endDate: Date

  @Column()
  dateStart: Date

  @Column()
  dateEnd: Date

  @Column()
  taskId: number

  @ManyToOne(() => Category, (category) => category.tasks)
  @Field(() => Category)
  category: Category
}
