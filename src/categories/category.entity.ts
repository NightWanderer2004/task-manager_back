import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Timestamp,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  dateCreated: Date

  @Column()
  @Field(() => Int, { nullable: true })
  userId?: number

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User

  @OneToMany(() => Task, (task) => task.category)
  @Field(() => [Task])
  tasks: Task[]
}
