import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: parseInt(process.env.MONGODB_PORT),
      host: process.env.MONGODB_HOST,
      url: process.env.MONGODB_URL,
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD,
      database: process.env.MONGODB_DATABASE,
      entities: [User],
      useUnifiedTopology: false,
      useNewUrlParser: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
