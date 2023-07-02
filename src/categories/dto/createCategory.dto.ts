import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

@InputType()
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsDate()
  @Field()
  dateCreated: Date

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  userId?: number
}
