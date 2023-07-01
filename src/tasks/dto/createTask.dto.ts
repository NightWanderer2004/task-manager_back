import { Field, InputType } from '@nestjs/graphql'
import { IsDate, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateTaskDto {
  @IsString()
  @Field()
  name: string

  @IsDate()
  @Field()
  dateStart: Date

  @IsDate()
  @Field()
  dateEnd: Date

  @IsNumber()
  @Field()
  taskId: number
}
