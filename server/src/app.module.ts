import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

import { MurmursModule } from './murmurs/murmurs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'docker',
    //   password: 'docker',
    //   database: 'test',
    //   entities: [User],
    //   synchronize: true,
    // }),
    // TypeOrmModule.forFeature([User]),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'docker',
      password: process.env.DB_PASSWORD || 'docker',
      database: process.env.DB_NAME || 'technical_test_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Use migrations in production
    }),
    AuthModule,
    UsersModule,
    MurmursModule,

  ]
})
export class AppModule { }
