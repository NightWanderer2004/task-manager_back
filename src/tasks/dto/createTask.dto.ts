import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

@InputType()
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string

  @IsDate()
  @Field()
  dateStart: Date

  @IsDate()
  @Field()
  dateEnd: Date

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  taskId?: number
}
