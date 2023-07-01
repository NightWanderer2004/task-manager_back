import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateCategoryDto {
  @IsString()
  @Field()
  name: string

  @IsDate()
  @Field()
  dateCreated: Date

  @IsNumber()
  @Field(() => Int)
  userId: number
}
