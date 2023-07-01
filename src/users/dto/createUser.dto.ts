import { Field, InputType } from '@nestjs/graphql'
import { Role } from '../user.entity'
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export class CreatUserDto {
  @IsEmail()
  @Field()
  email: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak, please make it more secure.',
  })
  @Field()
  password: string

  @Field()
  role: Role
}
