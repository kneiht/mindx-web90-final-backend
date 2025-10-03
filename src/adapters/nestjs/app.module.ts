import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { TeachersModule } from './teachers/teachers.module';
import { TeacherPositionsModule } from './teacher-positions/teacher-positions.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    ImagesModule,
    TeachersModule,
    TeacherPositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
