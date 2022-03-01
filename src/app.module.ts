import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController], //3 Katmanlı mimari -> Controller
  providers: [AppService], //3 Katmanlı mimari -> Service Layer
})
export class AppModule {}
