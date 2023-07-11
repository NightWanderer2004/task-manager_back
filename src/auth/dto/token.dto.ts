import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsJWT } from 'class-validator'

@ObjectType()
export class Token {
  @IsJWT()
  @Field()
  accessToken: string

  @IsJWT()
  @Field()
  refreshToken: string

  @Field(() => Int)
  expiresIn: number | string

  @Field({ nullable: true })
  userId?: string
}
