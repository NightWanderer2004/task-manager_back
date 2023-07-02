import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class LoginUser {
  @IsEmail()
  @Field()
  email: string

  @Field()
  password: string
}
