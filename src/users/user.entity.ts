import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

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
  @Field()
  password: string

  @Column()
  @Field()
  role: Role
}
