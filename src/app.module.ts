import * as dotenv from 'dotenv'
dotenv.config()
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { CategoriesModule } from './categories/categories.module'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    UsersModule,
    CategoriesModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
