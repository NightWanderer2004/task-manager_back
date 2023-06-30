import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersResolver } from './users.resolver'
import { User } from './user.entity'
import { AuthModule } from 'src/auth/auth.module'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]) /*AuthModule*/],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
