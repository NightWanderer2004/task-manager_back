import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsDate,
  IsDateString,
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

  @IsDateString()
  @Field()
  dateStart: string

  @IsDateString()
  @Field()
  dateEnd: string

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  taskId?: number
}
