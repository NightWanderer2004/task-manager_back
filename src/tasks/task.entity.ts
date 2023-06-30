import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  dateStart: Date

  @Column()
  @Field()
  dateEnd: Date

  @Column()
  @Field()
  taskId: number
}
