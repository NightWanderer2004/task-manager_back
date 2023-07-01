import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Task } from '../tasks/task.entity'
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  dateCreated: Date

  @Column()
  @Field(() => Int)
  userId: number

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User

  @OneToMany(() => Task, (task) => task.category)
  @Field(() => [Task])
  tasks: Task[]
}
