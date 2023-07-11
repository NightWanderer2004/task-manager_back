import { Field, ObjectType } from '@nestjs/graphql'
import { IsJWT } from 'class-validator'
import { User } from 'src/users/user.entity'

@ObjectType()
export class LoginResponse {
  @IsJWT()
  @Field()
  token: string

  @IsJWT()
  @Field()
  refreshToken: string

  @Field(() => User)
  user: User
}
