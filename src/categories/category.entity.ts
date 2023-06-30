import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

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
  dateCreated: string

  @Column()
  @Field()
  userId: number
}
